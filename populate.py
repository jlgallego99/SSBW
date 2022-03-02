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

# Add ten users
users = []
for x in range(0, 11):
    user = Users()
    user.first_name = "hola"
    user.last_name = "hola"
    user.email = "hola"
    user.phone = "hola"
    user.gender = "hola"

    users.append(user)

Users.objects.insert(users)