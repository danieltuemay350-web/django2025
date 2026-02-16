from django.contrib import admin
from .models import post,Author,Members,Book,Loan,Catagory




# Register your models here.
admin.site.register(post)
admin.site.register(Author)
admin.site.register(Members)

admin.site.register(Catagory)
@admin.register(Book)

class BookAdmin(admin.ModelAdmin):
    search_fields=('title','isbn')
    list_display=('title','author','availableBooks')
    list_filter=('author','catagory')

# admin.py
# ... (existing imports)

@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = ('book', 'member', 'loan_date', 'due_date', 'return_date', 'is_overdue_display')
    list_filter = ('loan_date', 'due_date', 'return_date') # Filter loans by their dates
    search_fields = ('book__title', 'member__first_name', 'member__last_name') # Search by book or member name

    def is_overdue_display(self, obj):
        return obj.is_overdue
    is_overdue_display.boolean = True # Shows a nice tick/cross icon
    is_overdue_display.short_description = 'Overdue?' # Column header
