from django.shortcuts import get_object_or_404, render
from .models import Person, Address
from mongoengine import connect
from .forms import PersonForm
from django.core.files.storage import default_storage
from django.contrib.auth.decorators import login_required
import os

connect('ssbw', host='mongo')

def index(request):
    error = ""

    if request.method == "POST":
        f = PersonForm(request.POST, request.FILES)
        if f.is_valid():
            p = f.cleaned_data

            u = Person()
            u.firstName = p["firstName"]
            u.lastName = p["lastName"]
            u.email = p["email"]
            u.phone = p["phone"]
            u.gender = p["gender"]

            img = request.FILES.get('image', False)
            u.image = "img/" + img.name
            default_storage.save("fake_persons/static/img/" + img.name, img)

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

    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons, 'error': error})

@login_required
def person_detail(request, pk):
    p = Person.objects.get(pk=pk)
    return render(request, 'fake_persons/person.html', {'person': p})

@login_required
def person_new(request):
    f = PersonForm()
    return render(request, 'fake_persons/person_new.html', {'form': f})

@login_required
def person_delete(request, pk):
    if request.method == "POST":
        p = Person.objects.get(pk=pk)
        p.delete()

    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons})

@login_required
def person_edit(request, pk):
    person = Person.objects.get(pk=pk)
    f = PersonForm()
    
    if request.method == "GET":
        return render(request, 'fake_persons/person_edit.html', {'form': f, 'person': person})
    elif request.method == "POST":
        f = PersonForm(request.POST, request.FILES)
        print(f)
        if f.is_valid():
            p = f.cleaned_data

            person.update(set__firstName=p["firstName"])
            person.update(set__lastName=p["lastName"])
            person.update(set__email=p["email"])
            person.update(set__phone=p["phone"])
            person.update(set__gender=p["gender"])

            # Delete old image
            os.remove("fake_persons/static/" + person["image"])

            # Update new image
            img = request.FILES.get('image', False)
            person.update(set__image="img/" + img.name)
            default_storage.save("fake_persons/static/img/" + img.name, img)

            a = Address()
            a.street = p["street"]
            a.streetName = p["streetName"]
            a.buildingNumber = p["buildingNumber"]
            a.city = p["city"]
            a.zipcode = p["zipcode"]
            a.country = p["country"]
            a.countryCode = p["countryCode"]
            person.update(set__address=a)

        person = Person.objects.get(pk=pk)
        return render(request, 'fake_persons/person.html', {'person': person})

def download_image(f):
    with open('img/' + str(f), 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)