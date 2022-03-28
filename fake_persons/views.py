from django.shortcuts import get_object_or_404, render
from .models import Person, Address
from mongoengine import connect
from .forms import PersonForm

connect('ssbw', host='mongo')

def index(request):
    if request.method == "POST":
        f = PersonForm(request.POST)
        if f.is_valid():
            p = f.cleaned_data

            u = Person()
            u.firstName = p["firstName"]
            u.lastName = p["lastName"]
            u.email = p["email"]
            u.phone = p["phone"]
            u.gender = p["gender"]

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

    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons})

def person_detail(request, pk):
    p = Person.objects.get(pk=pk)
    return render(request, 'fake_persons/person.html', {'person': p})

def person_new(request):
    f = PersonForm()
    return render(request, 'fake_persons/person_new.html', {'form': f})

def person_delete(request, pk):
    if request.method == "POST":
        p = Person.objects.get(pk=pk)
        p.delete()

    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons})

def person_edit(request, pk):
    person = Person.objects.get(pk=pk)
    f = PersonForm()
    
    if request.method == "GET":
        return render(request, 'fake_persons/person_edit.html', {'form': f, 'person': person})
    elif request.method == "POST":
        f = PersonForm(request.POST)
        if f.is_valid():
            p = f.cleaned_data

            person.update(set__firstName=p["firstName"])
            person.update(set__lastName=p["lastName"])
            person.update(set__email=p["email"])
            person.update(set__phone=p["phone"])
            person.update(set__gender=p["gender"])

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