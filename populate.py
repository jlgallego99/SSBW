from mongoengine import *
from decouple import config

connect(host=config("MONGOURI"))