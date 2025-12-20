from django.urls import path
from . import views

urlpatterns = [
    path('todo/<int:td>/', views.todo_detail, name='todo_detail'),
    path('todo/create/', views.todo_create, name='todo_create'),    
    path('todo/<int:td>/delete/', views.todo_delete, name='todo_delete'),
    path('todo/<int:td>/update/', views.todo_update, name='todo_update'),
    path('todo/<int:td>/complete/', views.mark_completed, name='mark_completed'),
    path('todo/<int:td>/toggle/', views.mark_completed, name='todo_toggle'),
    path('', views.todo_list, name='todo_list'),
]
