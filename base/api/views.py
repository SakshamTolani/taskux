from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from base.models import Task
from .serializers import TaskSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["firstname"] = user.first_name
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data["name"],
            username=data["email"],
            email="",
            password=make_password(data["password"]),
        )
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {"detail": "User with this email already exists."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
    ]
    return Response(routes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTasks(request):
    user = request.user
    title_query = request.query_params.get("title")
    desc_query = request.query_params.get("desc")
    status_query = request.query_params.get("status")
    priority_query = request.query_params.get("priority")
    # tasks = user.task_set.all()
    if title_query == None:
        title_query = ""
    if desc_query == None:
        desc_query = ""
    if status_query == None:
        status_query = ""
    if priority_query == None:
        priority_query = ""
    tasks = Task.objects.filter(
        user=user,
        title__icontains=title_query,
        desc__icontains=desc_query,
        status__icontains=status_query,
        priority__icontains=priority_query,
    )
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteTask(request, pk):
    task = Task.objects.filter(id=pk).first()
    task.delete()
    return Response("Task Deleted Successfully.")

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTask(request, pk):
    task = Task.objects.filter(id=pk).first()
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def editTask(request, pk):
    data = request.data
    task = Task.objects.filter(id=pk).first()
    task.title = data["title"]
    task.desc = data["desc"]
    task.due_date = data["due_date"]
    task.priority = data["priority"]
    task.status = data["status"]
    task.save()
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTask(request):
    user = request.user
    task = Task.objects.create(
        user=user,
        title="Sample Title",
        desc="Sample Description",
        due_date="2023-08-04",
        priority="MODERATE",
        status="PENDING",
    )
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def markComplete(request,pk):
    task = Task.objects.get(id=pk)
    task.status = "COMPLETED"
    task.save()
    return Response('Task was marked as completed')

