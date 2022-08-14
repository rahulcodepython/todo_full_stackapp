from django.urls import path
from api.views import TodoList, AddTodo, TodoUpdate, UserList, NewUser, UserDetailsChnage, ChangePassword, LoginUser, LogoutUser

urlpatterns = [
    path('', TodoList.as_view()),
    path('addtodo', AddTodo.as_view()),
    path('updatetodo/<int:pk>', TodoUpdate.as_view()),
    path('user', UserList.as_view()),
    path('newuser', NewUser.as_view()),
    path('changeuser/<str:usr>', UserDetailsChnage.as_view()),
    path('changepass/<str:usr>', ChangePassword.as_view()),
    path('loginuser', LoginUser.as_view()),
    path('logout', LogoutUser.as_view()),
]
