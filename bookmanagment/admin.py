from django.contrib import admin
from .models import *


# Register your models here.



@admin.register(Books)
class booksadmin(admin.ModelAdmin):
    list_filter=['author']
    search_fields=['title','isbn']
    list_display=['id','title','author']

@admin.register(Author)
class Authoradmin(admin.ModelAdmin):
    list_display=['id','name','bio']
    search_fields=['id','name']
    