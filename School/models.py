from django.db import models
from datetime import date, timedelta

# Create your models here.
class post(models.Model):
    title=models.CharField(max_length=100)
    content=models.TextField()
    published_date=models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
class Author(models.Model):
    name=models.CharField(max_length=50)
    def __str__(self):
        return self.name
class Catagory(models.Model):
    name=models.CharField(max_length=100)   
    def __str__(self):
        return self.name



class Book(models.Model):
    title=models.CharField(max_length=100)
    author=models.ForeignKey(Author,on_delete=models.CASCADE )
    catagory=models.ManyToManyField(Catagory)
    isbn = models.CharField(max_length=13, unique=True )
    availableBooks=models.IntegerField(default=1 ,blank=True)

    def __str__(self):
        return self.title
    
    
class Members(models.Model):
    name=models.CharField(max_length=50)
    active=models.BooleanField(default=False)

    def __str__(self):
        return self.name
class Loan(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='loans') # Keep CASCADE here if a book is deleted, its loan records should go too.
    member = models.ForeignKey(Members, on_delete=models.CASCADE, related_name='loans')
    loan_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True) # Add this
    return_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.due_date: # Set due date automatically on creation
            self.due_date = self.loan_date + timedelta(weeks=2) # Example: 2 weeks loan period
        super().save(*args, **kwargs)

    @property
    def is_overdue(self):
        # A loan is overdue if it's not returned and the due date has passed
        return self.return_date is None and self.due_date and self.due_date < date.today()

    def __str__(self):
        status = ""
        if self.is_overdue:
            status = " (OVERDUE!)"
        elif self.return_date:
            status = " (Returned)"
        else:
            status = " (Active)"
        return f"Loan: {self.book.title} to {self.member}{status}"