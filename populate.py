from mongoengine import connect, Document, EmbeddedDocument
from mongoengine.fields import EmbeddedDocumentField, StringField, ListField, IntField, DateTimeField
from datetime import datetime
from decouple import config

connect(host=config("MONGOURI"))

class Users(Document):
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    email = StringField(required=True)
    phone = StringField(max_length=15)
    gender = StringField(max_length=6)