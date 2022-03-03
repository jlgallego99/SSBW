import requests
from models import *
from mongoengine import connect

connect('ssbw', host='mongo')

# Add ten fake users
users = []
r = requests.get("https://fakerapi.it/api/v1/persons?_quantity=10")
for user in r.json()["data"]:
    u = Users()
    #u.id = user["id"]
    u.firstName = user["firstname"]
    u.lastName = user["lastname"]
    u.email = user["email"]
    u.phone = user["phone"]
    u.birthday = user["birthday"]
    u.gender = user["gender"]
    u.website = user["website"]
    
    a = Address()
    a.street = user["address"]["street"]
    a.streetName = user["address"]["streetName"]
    a.buildingNumber = user["address"]["buildingNumber"]
    a.city = user["address"]["city"]
    a.zipcode = user["address"]["zipcode"]
    a.country = user["address"]["country"]
    a.countryCode = user["address"]["county_code"]
    u.address = a

    users.append(u)

Users.objects.insert(users)