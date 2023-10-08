from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from base.api.views import registerUser
from django.contrib.auth.models import User
import jwt

class RegisterUserTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_register_user_success(self):
        """
        Test register user with valid data
        """
        data = {
            'name': 'Test User',
            'email': 'testuser@example.com',
            'password': 'testpassword',
            'confirm_password': 'testpassword',
        }
        response = self.client.post(reverse(registerUser), data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], data['email'])
        self.assertEqual(response.data['email'], data['email'])
        self.assertNotEqual('password', response.data)

    def test_register_user_failure(self):
        """
        Test register user with invalid data
        """
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword',
            'confirm_password': 'wrongpassword',
        }
        response = self.client.post(reverse(registerUser), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_duplicate_username(self):
        """
        Test register user with duplicate username
        """
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword',
            'confirm_password': 'testpassword',
        }
        self.client.post(reverse(registerUser), data=data)
        response = self.client.post(reverse(registerUser), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class LoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create a test user for login
        self.username = "testuser"
        self.password = "testpassword"
        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
        )
    
    def test_login_successful(self):
        # Send a POST request to the login endpoint
        response = self.client.post('/api/token/', {
            'username': self.username,
            'password': self.password,
        }, format='json')
        
        
        # Assert that the response contains a token
        self.assertIn('access', response.data)
        
        # Further assertions for the token if needed
        
        # For example, you can decode and verify the JWT token
        # using the 'jwt' library to ensure it's valid
        
        # For decoding:
        token = response.data['access']
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        
        # Assert specific claims or properties of the decoded token if needed
        
    def test_login_invalid_credentials(self):
        # Send a POST request to the login endpoint with invalid credentials
        response = self.client.post('/api/token/', {
            'username': self.username,
            'password': 'incorrectpassword',
        }, format='json')
        
        # Assert that the response has a status code of 401
        self.assertEqual(response.status_code, 401)
        
        # Assert that the response does not contain a token
        self.assertNotIn('access', response.data)