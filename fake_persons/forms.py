from django import forms
from .models import Person

class PersonForm(forms.Form):
    firstName = forms.CharField(max_length=50, required=True)
    lastName = forms.CharField(max_length=50, required=True)
    email = forms.CharField(max_length=50, required=True)
    gender = forms.CharField(max_length=10, required=True) 