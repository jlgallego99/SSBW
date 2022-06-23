from django import forms

class PersonForm(forms.Form):
    firstName = forms.CharField(max_length=50, required=True)
    lastName = forms.CharField(max_length=50, required=True)
    email = forms.CharField(max_length=50, required=True)
    gender = forms.CharField(max_length=10, required=True)
    phone = forms.IntegerField(required=True)
    image = forms.FileField(required=False)
    street = forms.CharField(max_length=50, required=False)
    streetName = forms.CharField(max_length=50, required=False)
    buildingNumber = forms.IntegerField(required=False)
    city = forms.CharField(max_length=50, required=False)
    zipcode = forms.IntegerField(required=False)
    country = forms.CharField(max_length=50, required=False)
    countryCode = forms.CharField(required=False)