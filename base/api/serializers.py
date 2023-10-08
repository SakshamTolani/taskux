
from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields=['title','desc','due_date','priority','status','id']

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','email', 'first_name', 'password','name','isAdmin','username' ]

    def get_id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

