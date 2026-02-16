from django.urls import path
from . import views
from .views import BookUpdateView,BookCreateView,BookDelete

urlpatterns=[
    path('/books/',views.booklist,name='booklist'),
    path('',views.homebook,name="bookhome"),
    path('/detail/<int:id>',views.bookdetail,name="bookdetail"),
    path('/create',views.bookcreate,name='bookcreate'),
    path('/authors',views.authorlist,name='authors'),
    path('/delete/<int:id>',views.bookdelete,name='delete'),
    path('/update/<int:id>',views.bookupdate,name='update'),
    path('/authordetail/<int:id>',views.authordetail,name='authors'),
    path('/apilist',views.list,name='apilist'),
    path('/authorapi',views.listAuhtor,name='authorapi'),
    path('/book/<int:id>',views.booklistapi,name='book'),
    path('/author/<int:id>',views.authorlistapi,name='author'),
    path('/createbookapi',BookCreateView.as_view(),name='bookapi'),
    path('/updateapi/<int:id>',BookUpdateView.as_view(),name='bookupdateapi'),
    path('/deleteapi/<int:id>',BookDelete.as_view(),name='delet')
]