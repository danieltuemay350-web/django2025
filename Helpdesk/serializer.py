from rest_framework import serializers
from .models import *


class Ticketserializer(serializers.ModelSerializer):
    class Meta:
        model=ticket
        fields ='__all__'

class Replyserializeer(serializers.ModelSerializer):
    class Meta:
        model=reply
        fields='__all__'
