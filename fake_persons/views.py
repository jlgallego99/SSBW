from django.shortcuts import get_object_or_404, render
from .models import Person
from mongoengine import connect

connect('ssbw', host='mongo')

def index(request):
    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons})

def person_detail(request, pk):
    p = Person.objects.get(pk=pk)
    return render(request, 'fake_persons/person.html', {'person': p})