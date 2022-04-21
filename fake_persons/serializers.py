from random import choices
from rest_framework import serializers
from .models import Person

class PersonSerializer(serializers.Serializer):
    id = serializers.CharField(required=True)
    firstName = serializers.CharField(max_length=50, required=True)
    lastName = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(required=True)
    phone = serializers.CharField(max_length=50, required=False)
    birthday = serializers.DateTimeField(required=False)
    gender = serializers.ChoiceField(required=True, choices=['male', 'female'])
    image = serializers.CharField()