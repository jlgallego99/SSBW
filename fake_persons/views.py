from django.shortcuts import get_object_or_404, render
from .models import Person
from mongoengine import connect

connect('ssbw', host='mongo')

def index(request):
    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons})

def person(request):
    return render(request, 'fake_persons/person.html', {})