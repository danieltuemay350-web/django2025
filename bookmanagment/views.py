from django.shortcuts import render,get_list_or_404,redirect
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status,viewsets
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import UpdateAPIView,CreateAPIView
from rest_framework.views import APIView
from .models import *
from .form import *
from .serializer import *


# Create your views here.


def homebook(request):
     return render(request,"home.html")


def booklist(request):
    books=Books.objects.all()
            
    return  render(request,'booklist.html',{'books':books} )


def bookdetail(request,id):
     books=Books.objects.get(pk=id)

     return render(request,"detail.html",{"book":books})
   


def bookdelete(request,id):
     books=Books.objects.get(id=id)
     if books:
          
          books.delete()
          return HttpResponse('deleted successfully')
     return HttpResponse('not deleted')

def authorlist(request):
     authors=Author.objects.all()
     h1="<h1> authors list</h1>"
     for A in authors:
          name=A.name
          h1+=f"<li>{name}</li>"

     return HttpResponse(h1)

def authordetail(request,id):
     author=Author.objects.get(pk=id)
     return HttpResponse(f"<h1>Name :{author.name}</h1> <h3>Bio</h3> <p>{author.bio}")


@csrf_exempt
def bookupdate(request,id):
     books=Books.objects.get(pk=id)
    
     if request.method=='POST':
           form=Bookform(request.POST,instance=books)
           if form.is_valid():
              form = Bookform(request.POST, instance=books)
              form.save()
              return redirect("booklist")
           else:
              return HttpResponse("<h1>ERROR</h1> your haven't saved!")
     else:
         form=Bookform(instance=books)
         form_html=form.as_p()
         page=f"""
        <html>
        <body style='font-family: sans-serif; padding: 50px;'>
            <h1> Add Book to Shelf</h1>
            <hr>
            <form method="POST">
                {form_html}
                <br>
                <button type="submit" style='padding: 10px 20px; background: blue; color: white; border: none; cursor: pointer;'>
                    Save Book to Database
                </button>
            </form>
        </body>
        </html>

        """
         return HttpResponse(page)

       
     
          

def bookcreate(request):
    if request.method=="POST":
         form=Bookform(request.POST)

         if form.is_valid():
              form.save()
              return redirect('bookhome')
              #return HttpResponse("<div style='color: green; font-family: sans-serif;'><h1>success!  </h1></div>")
    else:
             form=Bookform()
             # return HttpResponse("<h1>ERROR</h1> your haven't saved!")
                  
         
    return render(request,"create.html",{"form":form})

@api_view(['GET'])
def list(request):
     books=Books.objects.all()
     serializer=Bookserlizer(books,many=True)
     return Response(serializer.data)


@api_view(['GET'])
def booklistapi(request,id):
     book=Books.objects.filter(id=id).first()
     if book:
          serializer=Bookserlizer(book)
          return Response(serializer.data)
     else:
          return Response({"error":"Book not found"},status=404)
          











@api_view(['GET'])
def listAuhtor(request):
     authors=Author.objects.all()
     serializer=Authorserializer(authors,many=True)
     return Response(serializer.data)


@api_view(['GET'])
def authorlistapi(request,id):
     author=Author.objects.filter(id=id).first()
     if author:
          serializer=Authorserializer(author)
          return Response(serializer.data)
     else:
          return Response({"error":"author not found"},status=404)
          




class BookCreateView(CreateAPIView):
    queryset = Books.objects.all()
    serializer_class = Bookserlizer


class BookUpdateView(UpdateAPIView):
    queryset = Books.objects.all()
    serializer_class = Bookserlizer
    lookup_field = "id"


class BookDelete(APIView):
    def delete(self, request, id, format=None):
        try:
            book = Books.objects.get(pk=id)
            book.delete()
            return Response({"message": "Book deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Books.DoesNotExist:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)




























