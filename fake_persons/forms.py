from django import forms
from .models import Person

class PersonForm(forms.Form):
    firstName = forms.CharField(max_length=50, required=True)
    lastName = forms.CharField(max_length=50, required=True)
    email = forms.CharField(max_length=50, required=True)
    gender = forms.CharField(max_length=10, required=True)
    phone = forms.IntegerField(required=True)
    street = forms.CharField(max_length=50)
    streetName = forms.CharField(max_length=50)
    buildingNumber = forms.IntegerField()
    city = forms.CharField(max_length=50)
    zipcode = forms.IntegerField()
    country = forms.CharField(max_length=50)
    countryCode = forms.CharField(max_length=2)