from django.db import models
from django.contrib.auth.models import User
import django.utils.timezone as date
# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    desc = models.CharField(max_length=200)
    due_date=models.DateField(auto_now=False, default=date.now)
    priority=models.CharField(max_length=50, choices=[('IMPORTANT','IMPORTANT'), ('MODERATE','MODERATE')], default="MODERATE")
    status=models.CharField(max_length=50, choices=[('COMPLETED','COMPLETED'), ('PENDING','PENDING')], default="PENDING")

    def __str__(self) -> str:
        return str('Todo for ' + str(self.user).upper())
    
