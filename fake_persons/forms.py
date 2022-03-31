from django import forms

class PersonForm(forms.Form):
    firstName = forms.CharField(max_length=50, required=True)
    lastName = forms.CharField(max_length=50, required=True)
    email = forms.CharField(max_length=50, required=True)
    gender = forms.CharField(max_length=10, required=True)
    phone = forms.IntegerField(required=True)
    image = forms.FileField(required=True)
    street = forms.CharField(max_length=50)
    streetName = forms.CharField(max_length=50)
    buildingNumber = forms.IntegerField()
    city = forms.CharField(max_length=50)
    zipcode = forms.CharField()
    country = forms.CharField(max_length=50)
    countryCode = forms.CharField(max_length=2)