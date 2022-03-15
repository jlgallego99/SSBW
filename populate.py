import requests
from fake_persons.models import *
from mongoengine import connect

connect('ssbw', host='mongo')

def downloadImage(filename):
    response = requests.get("https://thispersondoesnotexist.com/image", headers={'User-Agent': 'My User Agent 1.0'}).content
    with open(filename, 'wb') as f:
        f.write(response)

# Add ten fake persons
persons = []
r = requests.get("https://fakerapi.it/api/v1/persons?_quantity=10")
for user in r.json()["data"]:
    u = Person()
    u.firstName = user["firstname"]
    u.lastName = user["lastname"]
    u.email = user["email"]
    u.phone = user["phone"]
    u.birthday = user["birthday"]
    u.gender = user["gender"]
    u.website = user["website"]

    # Fake user photo
    photoName = "./fake_persons/static/img/image" + str(user["id"]) + ".jpg" 
    downloadImage(photoName)
    u.image = photoName
    
    a = Address()
    a.street = user["address"]["street"]
    a.streetName = user["address"]["streetName"]
    a.buildingNumber = user["address"]["buildingNumber"]
    a.city = user["address"]["city"]
    a.zipcode = user["address"]["zipcode"]
    a.country = user["address"]["country"]
    a.countryCode = user["address"]["county_code"]
    a.location = (user["address"]["latitude"], user["address"]["longitude"])
    u.address = a

    persons.append(u)

Person.objects.insert(persons)