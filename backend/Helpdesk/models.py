from django.db import models

# Create your models here.
class user(models.Model):
    firstName=models.CharField(max_length=20,blank=False)
    lastName=models.CharField(max_length=20,blank=False)
    phoneNumber=models.IntegerField(unique=True)
    email=models.EmailField(unique=True,blank=False)


    def __str__(self):
        return f'{self.firstName } {self.lastName}'

class ticket(models.Model):
    user=models.ForeignKey(user, on_delete=models.CASCADE , related_name='ticket')
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=1000)
    statuschoice=[
        ("o","open"),
        ("c","closed"),
    ]
    status=models.CharField(max_length=10,choices=statuschoice,default='open')
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tittle

class reply(models.Model):
    tickets=models.ForeignKey(ticket, on_delete=models.CASCADE ,related_name='ticket')
    message=models.CharField(max_length=1000)
    is_admin=models.BooleanField(default=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.tickets}'