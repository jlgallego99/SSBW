from django.forms import URLField
from mongoengine import Document, EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField, StringField, EmailField, LongField, ListField, IntField, DateTimeField, GeoPointField
from datetime import datetime
from decouple import config

class Address(EmbeddedDocument):
    street = StringField(max_length=50, required=True)
    streetName = StringField(max_length=50, required=False)
    buildingNumber = IntField(required=False)
    city = StringField(max_length=50, required=False)
    zipcode = IntField(required=False)
    country = StringField(max_length=50, required=False)
    countryCode = StringField(max_length=2, required=False)
    location = GeoPointField(required=False)

class Users(Document):
    firstName = StringField(max_length=50, required=True)
    lastName = StringField(max_length=50, required=True)
    email = EmailField(required=True)
    phone = LongField(required=False)
    birthday = DateTimeField(required=False)
    gender = StringField(required=True, choices=['male', 'female'])
    website = URLField(required=False)
    image = StringField(required=False)
    address = EmbeddedDocumentField(Address)