from django.db import models
from django.contrib.auth.models import User

class Todos(models.Model):
    id_no = models.AutoField(primary_key=True, null=False, blank=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo = models.CharField(max_length=100)
    done = models.BooleanField(default=False)
