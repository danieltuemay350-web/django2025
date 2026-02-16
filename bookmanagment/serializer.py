from rest_framework import serializers
from .models import *

class Bookserlizer(serializers.ModelSerializer):
    class Meta:
        model=Books
        fields='__all__'

class Authorserializer(serializers.ModelSerializer):
    class Meta:
        model=Author
        fields='__all__'
