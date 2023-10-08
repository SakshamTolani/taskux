from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from base.models import Task
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken

class RetrieveAllTasksTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/tasks/'
        self.username = "testuser"
        self.password = "testpassword"
        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
        )
        self.token = AccessToken.for_user(self.user)
        

        # Creating dummy tasks
        self.task = Task.objects.create(user = self.user , title='Task 1', desc='Description 1', status="PENDING")
        self.task2 = Task.objects.create(user = self.user , title='Task 2', desc='Description 2', status="COMPLETED")

    def get_auth_header(self):
        return {'HTTP_AUTHORIZATION': f'Bearer {str(self.token)}'}

    def test_retrieve_all_tasks(self):
        response = self.client.get(self.url,**self.get_auth_header())
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['title'], 'Task 1')
        self.assertEqual(response.data[0]['desc'], 'Description 1')
        self.assertEqual(response.data[1]['title'], 'Task 2')
        self.assertEqual(response.data[1]['desc'], 'Description 2')

    def test_get_task(self):

        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/api/tasks/{self.task.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.task.title)
        self.assertEqual(response.data['desc'], self.task.desc)
        self.assertEqual(response.data['status'], self.task.status)


    def test_task_list_view(self):
        task_data = {
            'title': 'Sample Task',
            'description': 'This is a sample task description',
            'status': 'pending'
        }

        response = self.client.post('/api/tasks/create/', task_data,
                                    format='json', **self.get_auth_header())
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_delete_task(self):
        self.task = Task.objects.create(
            title='Sample Task',
            desc='This is a sample task description',
            status='pending',
            user=self.user
        )
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f'/api/tasks/delete/{self.task.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # Verify that the task has been deleted from the database
        self.assertFalse(Task.objects.filter(id=self.task.id).exists())

    def test_update_task(self):
        updated_data = {
            'title': 'Updated Task',
            'desc': 'This is an updated task description',
            'due_date':'2023-07-10',
            'status': 'completed',
            'priority':"IMPORTANT"
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f'/api/tasks/edit/{self.task.id}/', updated_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()

        self.assertEqual(self.task.title, updated_data['title'])
        self.assertEqual(self.task.desc, updated_data['desc'])
        self.assertEqual(self.task.status, updated_data['status'])

    def test_complete_task(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f'/api/tasks/completed/{self.task.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()

        self.assertEqual(self.task.status, 'COMPLETED')
