from django.shortcuts import get_object_or_404, render

from SSBW.fake_persons.serializers import PersonSerializer
from .models import Person, Address
from mongoengine import connect
from .forms import PersonForm
from .serializers import PersonSerializer
from django.core.files.storage import default_storage
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
import logging
import os

connect('ssbw', host='mongo')

logger = logging.getLogger(__name__)

@csrf_exempt
def api_person_list(request):
    if request.method == 'GET':
        logger.info("API: GET Person list")
        persons = Person.objects.all()
        serializer = PersonSerializer(persons, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        logger.info("API: POST Person")
        data = JSONParser().parse(request)
        serializer = PersonSerializer(data=data)
        if serializer.is_valid():
            logger.debug(serializer.data)
            # serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def api_person_detail(request, pk):
    try:
        person = Person.objects.get(pk=pk)
    except Person.DoesNotExist:
        logger.error("Person not found")
        return JsonResponse({"error": "Person not found"}, status=404)

    if request.method == 'GET':
        logger.info("API: GET Person detail")
        serializer = PersonSerializer(person)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        logger.info("API: PUT Person detail")
        data = JSONParser().parse(request)
        serializer = PersonSerializer(person, data=data)
        if serializer.is_valid():
            logger.debug(serializer.data)
            # serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        logger.info("API: DELETE Person")
        person.delete()
        return JsonResponse({'deleted': True})

def index(request):
    logger.info("Request: home page")
    error = ""

    if request.method == "POST":
        f = PersonForm(request.POST, request.FILES)
        if f.is_valid():
            logger.info("New Person Form is valid")
            p = f.cleaned_data

            u = Person()
            u.firstName = p["firstName"]
            u.lastName = p["lastName"]
            u.email = p["email"]
            u.phone = p["phone"]
            u.gender = p["gender"]

            # Check if there is an image on FILES
            img = request.FILES.get('image', False)
            if img:
                logger.info("Downloading image for the new person")
                u.image = "img/" + img.name
                default_storage.save("fake_persons/static/img/" + img.name, img)
            else:
                logger.info("Creating person without image")

            a = Address()
            a.street = p["street"]
            a.streetName = p["streetName"]
            a.buildingNumber = p["buildingNumber"]
            a.city = p["city"]
            a.zipcode = p["zipcode"]
            a.country = p["country"]
            a.countryCode = p["countryCode"]
            u.address = a

            u.save()
        else:
            error = "Couldn't create person"
            logger.error("Invalid Person Form: %s", error)

    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons, 'error': error})

@login_required
def person_detail(request, pk):
    logger.info("Request: Person detail with id %s", pk)
    p = Person.objects.get(pk=pk)
    return render(request, 'fake_persons/person.html', {'person': p})

@login_required
def person_new(request):
    logger.info("Request: New person form")
    f = PersonForm()
    return render(request, 'fake_persons/person_new.html', {'form': f})

@login_required
def person_delete(request, pk):
    logger.info("Request: Delete person with id %s", pk)
    if request.method == "POST":
        p = Person.objects.get(pk=pk)

        # Delete image file
        if p["image"] and os.path.exists("fake_persons/static/" + p["image"]):
            os.remove("fake_persons/static/" + p["image"])

        p.delete()

        logger.info("Person with id %s deleted", pk)
        return JsonResponse({"success":True})
    else:
        return JsonResponse({"success":False})

@login_required
def person_edit(request, pk):
    logger.info("Request: Edit person with id %s", pk)
    person = Person.objects.get(pk=pk)
    f = PersonForm()
    
    if request.method == "GET":
        return render(request, 'fake_persons/person_edit.html', {'form': f, 'person': person})
    elif request.method == "POST":
        f = PersonForm(request.POST, request.FILES)
        if f.is_valid():
            logger.info("Edit Person Form is valid")
            p = f.cleaned_data

            person.update(set__firstName=p["firstName"])
            person.update(set__lastName=p["lastName"])
            person.update(set__email=p["email"])
            person.update(set__phone=p["phone"])
            person.update(set__gender=p["gender"])

            # Check if there is an image on FILES
            img = request.FILES.get('image', False)
            if img:
                logger.info("Changing image of person with id %s", pk)

                # Delete old image
                os.remove("fake_persons/static/" + person["image"])

                # Update new image
                person.update(set__image="img/" + img.name)
                default_storage.save("fake_persons/static/img/" + img.name, img)
            else:
                logger.info("Keeping image of person with id %s", pk)

            a = Address()
            a.street = p["street"]
            a.streetName = p["streetName"]
            a.buildingNumber = p["buildingNumber"]
            a.city = p["city"]
            a.zipcode = p["zipcode"]
            a.country = p["country"]
            a.countryCode = p["countryCode"]
            person.update(set__address=a)
        else:
            logger.error("Invalid Edit Person Form")

        person = Person.objects.get(pk=pk)
        return render(request, 'fake_persons/person.html', {'person': person})