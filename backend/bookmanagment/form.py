from django import forms
from .models import *

class Bookform(forms.ModelForm):
    class Meta:
        model=Books
        fields=['id','title','author','isbn']