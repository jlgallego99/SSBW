import requests
from mongoengine import connect, Document, EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField, StringField, ListField, IntField, DateTimeField
from datetime import datetime
from decouple import config

connect('ssbw', host='mongo')

class Users(Document):
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    email = StringField(required=True)
    phone = StringField(max_length=15)
    gender = StringField(max_length=6)

# Add ten fake users
users = []
r = requests.get("https://fakerapi.it/api/v1/persons?_quantity=10")
for user in r.json()["data"]:
    u = Users()
    u.first_name = user["firstname"]
    u.last_name = user["lastname"]
    u.email = user["email"]
    u.phone = user["phone"]
    u.gender = user["gender"]
    users.append(u)

Users.objects.insert(users)