from django.shortcuts import get_object_or_404, render
from .models import Person
from mongoengine import connect
from .forms import PersonForm

connect('ssbw', host='mongo')

def index(request):
    if request.method == "POST":
        f = PersonForm(request.POST)
        if f.is_valid():
            p = f.cleaned_data
            Person.objects.create(firstName=p["firstName"], lastName=p["lastName"], email=p["email"], gender=p["gender"])

    persons = Person.objects.all()
    return render(request, 'fake_persons/index.html', {'persons': persons})

def person_detail(request, pk):
    p = Person.objects.get(pk=pk)
    return render(request, 'fake_persons/person.html', {'person': p})

def person_new(request):
    f = PersonForm()
    return render(request, 'fake_persons/person_new.html', {'form': f})