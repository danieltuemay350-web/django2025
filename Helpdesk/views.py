from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponse,JsonResponse
from .models import *
from .serializer import *
# Create your views here.
@api_view(['GET'])
def home(request):
    Ticekts=ticket.objects.all()
    serializer=Ticketserializer(Ticekts,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_ticket(request):
    Ticekts=ticket.objects.all()
    serializer=Ticketserializer(Ticekts,many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=400)