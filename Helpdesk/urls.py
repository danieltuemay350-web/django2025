from django.urls import path,include
from . import views


urlpatterns=[
    path('',views.home, name="home"),
     path('post',views.add_ticket, name="update"),
]