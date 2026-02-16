from django.db import models


# Create your models here.
class Author(models.Model):
    id=models.IntegerField(primary_key=True,unique=True,null=False,blank=False)
    name=models.CharField(max_length=255)
    bio=models.TextField(null=False,blank=False)

    def __str__(self):
        return self.name


class Books(models.Model):
    id=models.IntegerField(primary_key=True,unique=True,null=False,blank=False)
    title=models.CharField(max_length=255)
    author=models.ForeignKey(Author,on_delete=models.CASCADE ,related_name="book")
    isbn=models.IntegerField(unique=True,null=False,blank=False)

    def __str__(self):
        return f'{self.title} by {self.author}'