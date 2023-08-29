# TASK MANAGEMENT APPLICATION USING DJANGO REST FRAMEWORK AND REACT.JS
- [Django REST framework](http://www.django-rest-framework.org/) is a powerful and flexible toolkit for building Web APIs.
- [React.JS](https://legacy.reactjs.org/) is an open-source JavaScript library, used for building user interfaces or UI components.

## Requirements
- Python 3.9.6
- Django 4.2.4
- Django REST Framework 3.14.0
- React.JS ^18.2.0
- Chakra UI ^2.8.0

## Quick Start

- Fork and Clone the repository using-
```
git clone https://github.com/SakshamTolani/taskux/
```
- Create a Branch- 
```
git checkout -b <branch_name>
```
- Create virtual environment-
```
python -m venv env
env\Scripts\activate
```
- Install dependencies using-
```
pip install -r requirements.txt
```
*If you have python2 and python3 installed you need to specify python3 by using command:*
```
python3 -m pip install -r requirements.txt
```

- Headover to Project Directory- 
```
cd backend
```
- Make migrations using-
```
python manage.py makemigrations
```
*If you have python2 and python3 installed you need to specify python3 by using command:*
```
python3 manage.py makemigrations
```

- Migrate Database-
```
python manage.py migrate
```
- Create a superuser-
```
python manage.py createsuperuser
```
- Run server using-
```
python manage.py runserver
```

## Structure
In a RESTful API, endpoints (URLs) define the structure of the API and how end users access data from our application using the HTTP methods - GET, POST, PUT, DELETE. Endpoints should be logically organized around _collections_ and _elements_, both of which are resources.

In our case, we have one single resource, `tasks`, so we will use the following URLS - `/api/` and `/api/tasks/` for collections and elements, respectively:

Endpoint |HTTP Method | CRUD Method | Result
-- | -- |-- |--
`api/tasks/` | GET | READ | Get all tasks
`api/register/` | POST | READ | Signup a user
`api/tasks/create/`| POST | CREATE | Create a new task
`api/tasks/:id/` | GET | READ | Get Task Details by id (task id)
`api/tasks/delete/:id/` | DELETE | READ | Delete Task by id (task id)
`api/tasks/completed/:id/` | PUT | READ | Mark Task as completed by id (task id)
`api/tasks/edit/:id/` | PUT | READ | Edit Task by id (task id)

### Commands
```
Get all tasks
http GET http://127.0.0.1:8000/api/tasks/
Register a new user
http POST http://127.0.0.1:8000/api/register/
Create a new task
http POST http://127.0.0.1:8000/api/tasks/create/ 
Get task Details by id
http GET http://127.0.0.1:8000/api/tasks/:id/`
Delete task using id
http DELETE http://127.0.0.1:8000/api/tasks/delete/:id/
Update task to completed using id
http PUT http://127.0.0.1:8000/api/tasks/completed/:id/
Edit taskusing id
http PUT http://127.0.0.1:8000/api/tasks/edit/:id/
```

> Made with ❤️ by Saksham Tolani




[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/)  [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)


