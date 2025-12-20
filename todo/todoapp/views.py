from django.shortcuts import redirect, render
from .models import Todo
from django.http import HttpResponse
# Create your views here.
def todo_list(request):
    todos=Todo.objects.all()
    return render (request ,'todoapp/todo_list.html',{'todos':todos})

def todo_detail(request,td):
    todo=Todo.objects.get(id=td)
    return render(request,'todoapp/todo_detail.html',{'todo':todo})
def todo_create(request):
    if request.method=='POST':
        title=request.POST.get('title')
        description=request.POST.get('description')
        todo=Todo.objects.create(title=title,description=description)
        return redirect('todo_list')
    return render (request,'todoapp/todo_create.html')
def todo_delete(request,td):
     if request.method == "POST":
        Todo.objects.filter(id=td).delete()
     return redirect("todo_list")
def todo_update(request, td):
    todo = Todo.objects.get(id=td)
    if request.method == "POST":
        todo.title = request.POST.get("title")
        todo.save()
        return redirect("todo_list")
    return render(request, "todoapp/todo_update.html", {"todo": todo})



def mark_completed(request,td):
    todo=Todo.objects.get(id=td)
    todo.completed=not todo.completed
    todo.save()
    return redirect('todo_list')

