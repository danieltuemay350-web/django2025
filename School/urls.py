from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('blog',views.blog,name="blog"),
    path('cbv',views.wellcome.as_view(),name ="wellcome"),
    path('library',views.library,name="books"),
    path('books',views.book_list,name="loan"),
    path('books/<int:book_id>/loan/',views.LoanCreateView.as_view()),
    path('api/books',views.list_books_json, name=" api" )


]
 