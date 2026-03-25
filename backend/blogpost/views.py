from django.shortcuts import render
from django.http import HttpResponse
from .models import *

# Create your views here.
def postshome(request):
    posts=Post.objects.all()
    header="<h1 style='color:cyan;'>All posts</h1>"
    if posts:
        for p in posts:
            if p.status=='PB':
                 header+=f'<hr> <h2>{p.title} posted by {p.author}</h2><hr> <p style="padding:10px;margin:10;font-family:Verdana;">{p.body}</p> <p>{p.file}</p><span style="margin:3px;color:gray;font-size:1rem;">{p.updated}</span>'
    return HttpResponse(header)