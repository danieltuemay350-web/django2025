from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .models import *
from django.views import View

# Create your views here.
def index(request):
    return HttpResponse(" HELLO WORLD")
def blog(request):
   posts=post.objects.all()
   titles="<hr>".join([post.title for post in posts ])
   if  not titles:
         return HttpResponse('no blogs yet')
   return HttpResponse(f"<h1>All Blog Posts:</h1> {titles}")

def library(request):
    books=Book.objects.select_related('author').prefetch_related('catagory').all()
    response="<h1> Available Books</h1>"
    for book in books:
        author_name=book.author.name
        catagory_list= ", ".join([c.name for c in book.catagory.all()])
        
        space="""
        <table border="2px" >
        <tr>
          <th>  <strong>Title</strong> </th>
           <th> <strong>Author</strong> </th>
            <th> <strong>Catagories</strong> </th>
            </tr>"""
        response+=f"""
        <table border="2px"  style="padding=10px">
               <tr>
               <td> {book.title} </td>
               <th> {book.author} </th>
               <th> {book.catagory} </th>
               </tr>  
                                
            </table>
            """


    return HttpResponse(space + response)




# Function Based View
def book_list(request):
    books = Book.objects.select_related("author").prefetch_related("categories")

    if request.GET.get("format") == "json":
        data = [
            {
                "title": b.title,
                "author": b.author.name,
                "categories": [c.name for c in b.category.all()],
                "copies": b.available_copies
            }
            for b in books
        ]
        return JsonResponse(data, safe=False)

    return HttpResponse( {"books": books})
class LoanCreateView(View):

    def post(self, request, book_id):
        member_id = request.POST.get("member_id")

        book = get_object_or_404(Book, id=book_id)
        member = get_object_or_404(Member, id=member_id)

        if book.available_copies <= 0:
            return JsonResponse({"error": "No copies available"}, status=400)

        Loan.objects.create(book=book, member=member)

        book.available_copies -= 1
        book.save()

        return JsonResponse({"message": "Loan created successfully"})


  
def books_never_loaned_view(request):
   
    books = Book.objects.filter(loans__isnull=True).select_related('author')
    
    response_html = "<h1>Books Never Loaned:</h1><ul>"
    if not books:
        response_html += "<li>No books found that have never been loaned.</li>"
    else:
        for book in books:
            response_html += f"<li>{book.title} by {book.author.name}</li>"
    response_html += "</ul>"
    return HttpResponse(response_html)
def science_books_by_newton_view(request):
    
    books = Book.objects.filter(
        catagories__name__iexact='Science', 
        author__name__iexact='Isaac Newton'
    ).distinct().select_related('author') 

    response_html = "<h1>Science Books by Isaac Newton:</h1><ul>"
    if not books:
        response_html += "<li>No Science books by Isaac Newton found.</li>"
    else:
        for book in books:
            response_html += f"<li>{book.title}</li>"
    response_html += "</ul>"
    return HttpResponse(response_html)

def top_members_with_active_loans_view(request):

    top_members = Members.objects.annotate(
        active_loans_count=Count('loans', filter=Q(loans__return_date__isnull=True))
    ).order_by('-active_loans_count')[:3] 
    

    response_html = "<h1>Top 3 Members with Most Active Loans:</h1><ul>"
    for member in top_members:
        if member.active_loans_count > 0:
            response_html += f"<li>{member.first_name} {member.last_name}: {member.active_loans_count} active loans</li>"
        else:
            response_html += "<li>No members with active loans found.</li>"
    response_html += "</ul>"
    return HttpResponse(response_html)

# --- Count how many books are in each category ---
def category_book_counts_view(request):
    category_counts = Catagory.objects.annotate(
        book_count=Count('books') # 'books' is the related_name from Category to Book
    ).order_by('name')

    response_html = "<h1>Book Count per Category:</h1><ul>"
    if not category_counts:
        response_html += "<li>No categories found.</li>"
    else:
        for category in category_counts:
            response_html += f"<li>{category.name}: {category.book_count} books</li>"
    response_html += "</ul>"
    return HttpResponse(response_html)

    



def list_books_json(request):
    books = Book.objects.select_related('author').prefetch_related('catagory').all()
    
    books_data = []
    for book in books:
        books_data.append({
            'title': book.title,
            'isbn': book.isbn,
            'author': book.author.name,
            'categories': [c.name for c in book.catagory.all()],
            'available_copies': book.availableBooks
           
        })
   

    return JsonResponse(books_data, safe=False) 


class wellcome(View):

   def get(self,request):
      return HttpResponse("Welcome to Django CBV")