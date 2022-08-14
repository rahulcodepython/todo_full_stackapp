from http.client import BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_406_NOT_ACCEPTABLE, HTTP_202_ACCEPTED, HTTP_200_OK, HTTP_404_NOT_FOUND
from api.models import Todos
from django.contrib.auth.models import User
from api.serializers import TodosSerializers, UserSerializers, CreateUserSerializer, UpdateUserSerializer, ChangePasswordSerializer, LoginUserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class TodoList(APIView):

    permission_classes = [AllowAny]

    def get(self, request, format = None):
        try:
            if request.user.is_authenticated:
                if Todos.objects.filter(user = request.user).exists():
                    todo = Todos.objects.filter(user = request.user).all()
                    todo_list_serializer = TodosSerializers(todo, many = True)
                    user_serializer = UserSerializers(request.user, many = False)

                    return Response({'todos': todo_list_serializer.data, 'user': user_serializer.data}, status = HTTP_200_OK)

                else:
                    return Response({'todos': "You have no todo yet.", 'user': "Guest"}, status=HTTP_406_NOT_ACCEPTABLE)

            else:
                return Response({'todos': "You are not register yet, so you have no todo to show", 'user': "Guest"}, status = HTTP_406_NOT_ACCEPTABLE)

        except:
            return Response({'msg': "Something went wrong. Try another way."}, status = HTTP_404_NOT_FOUND)

class AddTodo(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, format = None):
        try:
            if Todos.objects.filter(user = request.user).exists():
                new_todo_serializer = TodosSerializers(data = request.data)

                if new_todo_serializer.is_valid():
                    new_todo_serializer.save(user = request.user)

                    return Response({'msg': "New todo is added."}, status = HTTP_201_CREATED)
                
                else:
                    return Response({'msg': "Your form is invalid"}, status = HTTP_406_NOT_ACCEPTABLE)

            else:
                return Response({'msg': "You have created your first todo."}, status = HTTP_201_CREATED)

        except:
                return Response({'msg': "Something went wrong. Try another way."}, status = HTTP_404_NOT_FOUND)

class TodoUpdate(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, format = None):
        # try:
            if Todos.objects.filter(id_no = pk).exists():
                todo = Todos.objects.get(id_no = pk)
                if todo.user == request.user :
                    patch_serializer = TodosSerializers(todo, data = request.data, partial = True)

                    if patch_serializer.is_valid():
                        patch_serializer.save(user = request.user)
                        
                        return Response({'msg': "todo is updated."}, status = HTTP_202_ACCEPTED)
                    
                    else:
                        return Response({'msg': "Your form is invalid"}, status = HTTP_406_NOT_ACCEPTABLE)

                else:
                    return Response({'msg': "You can not edit others todo."}, status = HTTP_406_NOT_ACCEPTABLE)

            else:
                return Response({'msg': "There is no todo like this."}, status = HTTP_404_NOT_FOUND)
        
        # except:
        #     return Response({'msg': "Something went wrong. Try something new."}, status = HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format = None):
        try:
            if Todos.objects.filter(id_no = pk).exists():
                todo = Todos.objects.get(id_no = pk)

                if todo.user == request.user :
                    todo.delete()
                    
                    return Response({'msg': "todo is deleted."}, status = HTTP_200_OK)

                else:
                    return Response({'msg': "You can not delete other todos."}, status = HTTP_406_NOT_ACCEPTABLE)

            else:
                return Response({'msg': "This is not a valid todo."}, status = HTTP_406_NOT_ACCEPTABLE)

        except Exception as e:
            print(e)
            return Response({'msg': "Something went wrong. Try another way."}, status = HTTP_404_NOT_FOUND)

class UserList(APIView):

    permission_classes = [AllowAny]

    def get(self, request, format = None):
        try:
            if request.user.is_authenticated:
                user = User.objects.get(username = request.user)
                user_list_serializer = UserSerializers(user)

                return Response(user_list_serializer.data)

            else:
                return Response({'msg': "Annyonimus User"})

        except:
            return Response({'msg': "Something went wrong. Try another way."}, status = HTTP_404_NOT_FOUND)

class NewUser(APIView):

    permission_classes = [AllowAny]

    def post(self, request, format = None):
        try:
            new_user_serializer = CreateUserSerializer(data = request.data)

            if new_user_serializer.is_valid():
                new_user_serializer.save()

                return Response({'msg': "You are now registed."}, status = HTTP_200_OK)

            else:
                return Response({'msg': "Your user data is invalid"}, status = HTTP_406_NOT_ACCEPTABLE)

        except:
            return Response({'msg': "Something went wrong. Try another way"}, status = HTTP_404_NOT_FOUND)

class UserDetailsChnage(APIView):

    permission_classes = [IsAuthenticated]
    
    def patch(self, request, usr, format = None):
        try:
            if usr == request.user.username:
                user_serializer = UpdateUserSerializer(request.user, data = request.data, partial = True)

                if user_serializer.is_valid():
                    user_serializer.save()

                    return Response({'msg': "Your profile is updated."}, status = HTTP_202_ACCEPTED)

                else:
                    return Response({'msg': "Your data is invalid."}, status = HTTP_406_NOT_ACCEPTABLE)
                
            else:
                return Response({'msg': "You can not edit others profile."}, status = HTTP_406_NOT_ACCEPTABLE)

        except:
            return Response({'msg': "Something went wrong. Try another way"}, status = HTTP_404_NOT_FOUND)

class ChangePassword(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, usr, format = None):
        try:
            if usr == request.user.username:
                password_serializer = ChangePasswordSerializer(request.user, data = request.data)

                if password_serializer.is_valid():
                    print('ok')
                    password_serializer.save()

                    return Response({'msg': "Your password is updated."}, status = HTTP_202_ACCEPTED)

                else:
                    return Response({'msg': "Your data is invalid."}, status = HTTP_406_NOT_ACCEPTABLE)
                
            else:
                return Response({'msg': "You can not edit others profile."}, status = HTTP_406_NOT_ACCEPTABLE)

        except:
            return Response({'msg': "Something went wrong. Try another way"}, status = HTTP_404_NOT_FOUND)

class LoginUser(APIView):

    permission_classes = [AllowAny]

    def post(self, request, format = None):
        try:
            serializer = LoginUserSerializer(request.data)
            email = serializer.data['email']
            password = serializer.data['password']

            if User.objects.filter(email = email).exists():
                user = User.objects.get(email = email)

                if user.check_password(password):
                    user_authenticate = authenticate(username = user.username, password = password)

                    if user_authenticate is not None:
                        login(request, user_authenticate)
                        token = get_tokens_for_user(user_authenticate)
                        user_list_serializer = UserSerializers(user)

                        return Response({'token': token, 'user': user_list_serializer.data}, status = HTTP_200_OK)

                    else:
                        return Response({'msg': "User is none"}, status = HTTP_406_NOT_ACCEPTABLE)

                else:   
                    return Response({'msg': "The password is not match"}, status = HTTP_404_NOT_FOUND)

            else:   
                return Response({'msg': "The user is not exists"}, status = HTTP_404_NOT_FOUND)

        except:
            return Response({'msg': "Something went wrong. Try another way"}, status = HTTP_404_NOT_FOUND)

class LogoutUser(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format = None):
        try:
            logout(request)
            return Response({'msg': "You are now logout"}, status = HTTP_200_OK)
        
        except:
            return Response({'msg': "Something went wrong. Try another way"}, status = HTTP_404_NOT_FOUND)