from rest_framework import serializers
from api.models import Todos
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class TodosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Todos
        fields = ['id_no', 'todo', 'done']

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class CreateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required = True, validators = [UniqueValidator(queryset = User.objects.all(), message = 'This email is already taken.')])

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required = True, validators = [UniqueValidator(queryset = User.objects.all(), message = 'This email is already taken.')])
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

class ChangePasswordSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['password']

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

class LoginUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'password']