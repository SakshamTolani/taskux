from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView


urlpatterns=[
    path('', views.getRoutes),
    path('register/', views.registerUser),
    path('tasks/', views.getTasks),
    path('tasks/create/', views.createTask),
    path('tasks/completed/<str:pk>/', views.markComplete),
    path('tasks/<str:pk>/', views.getTask),
    path('tasks/delete/<str:pk>/', views.deleteTask),
    path('tasks/edit/<str:pk>/', views.editTask),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]