from django.shortcuts import get_object_or_404, render
from .models import Person, Address
from mongoengine import connect
from .forms import PersonForm
from django.core.files.storage import default_storage
from django.contrib.auth.decorators import login_required
import logging
import os

connect('ssbw', host='mongo')

logger = logging.getLogger(__name__)

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
        logger.info("Person with id %s deleted", pk)
        p = Person.objects.get(pk=pk)

        # Delete image file
        os.remove("fake_persons/static/" + p["image"])

        p.delete()

    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons})

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