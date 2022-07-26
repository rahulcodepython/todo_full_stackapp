from django.contrib import admin
from api.models import Todos

@admin.register(Todos)
class TodosAdmin(admin.ModelAdmin):
    list_display = ('id_no', 'todo', 'user', 'done')
