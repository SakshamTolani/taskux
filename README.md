# TASK MANAGEMENT APPLICATION USING DJANGO REST FRAMEWORK AND REACT.JS

The task management application is built using Django REST framework for the backend API and React.js for the frontend user interface.

## Requirements

- Python 3.9.6
- Django 4.2.4
- Django REST Framework 3.14.0
- React.JS ^18.2.0
- Chakra UI ^2.8.0

## Usage

1. Clone the repository:

```
git clone https://github.com/SakshamTolani/taskux/
```

2. Create a new branch:

```
git checkout -b <branch_name>
```

3. Set up the virtual environment and install dependencies:

```shell
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

If you have both Python 2 and Python 3 installed, make sure to specify Python 3 during the installation:

```shell
python3 -m venv env
source env/bin/activate
python3 -m pip install -r requirements.txt
```

4. Navigate to the backend directory:

```
cd backend
```

5. Perform migrations:

```shell
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser:

```shell
python manage.py createsuperuser
```

7. Run the server:

```shell
python manage.py runserver
```

## API Endpoints

The following RESTful API endpoints are available:

- GET `/api/tasks/`: Get all tasks
- POST `/api/register/`: Signup a user
- POST `/api/tasks/create/`: Create a new task
- GET `/api/tasks/:id/`: Get task details by ID
- DELETE `/api/tasks/delete/:id/`: Delete task by ID
- PUT `/api/tasks/completed/:id/`: Mark task as completed by ID
- PUT `/api/tasks/edit/:id/`: Edit task by ID
- POST `/api/token/`: Obtain JWT access and refresh tokens (used for authorization)

## Swagger Documentation

Swagger UI can be used to test and explore the API endpoints. It provides a user-friendly interface for interacting with the API.

- Local Swagger UI: [https://127.0.0.1:8000/api/schema/swagger-ui/](https://127.0.0.1:8000/api/schema/swagger-ui/)
- Live Deployment Swagger UI: [https://taskux.pythonanywhere.com/api/schema/swagger-ui/](https://taskux.pythonanywhere.com/api/schema/swagger-ui/)

### Authentication for SWAGGER

Most of the API endpoints require authentication. Here are the steps to authorize yourself using the Swagger UI:

1. Open the Swagger UI either locally or via the live deployment URL mentioned above.

2. Locate the `/api/token/` endpoint in the list of available endpoints.

3. Expand the `/api/token/` endpoint by clicking on it.

4. Select the "POST" method for the `/api/token/` endpoint.

5. In the "Request body" section, enter your username and password in the appropriate fields.

6. Click on the "Try it out" button to send the POST request.

7. The response will include both the access token and the refresh token.

8. In the Swagger UI, click the "Authorize" button available in the top-right corner.

9. In the "Value" field, enter the access token obtained in the previous step.

10. Click the "Authorize" button to authenticate yourself.

Now, you can test the API endpoints by entering the required parameters for each endpoint and clicking "Try it out" to send a request.

## Deployment on PythonAnywhere (with Database Setup)

To deploy the project on PythonAnywhere, follow these steps:

1. Create a PythonAnywhere account if you don't have one already: [https://www.pythonanywhere.com/](https://www.pythonanywhere.com/)

2. Once you're logged in, go to the Dashboard and navigate to the "Consoles" tab.

3. Click on the "Bash" button to open a new Bash console.

4. Clone your task management repository inside the Bash console:

```shell
git clone https://github.com/SakshamTolani/taskux/
```

5. Navigate to the `taskux` directory:

```shell
cd taskux/
```

6. Create a virtual environment:

```shell
python -m venv myenv
```

7. Activate the virtual environment:

```shell
source myenv/bin/activate
```

8. Install the project dependencies:

```shell
pip install -r requirements.txt
```

9. **Database Setup (Optional Step):**
   - Create a database on PythonAnywhere. Go to the "Databases" tab in the PythonAnywhere Dashboard and follow the instructions to set up your desired database.
   - Update the `settings.py` file in the `taskux/backend/taskux` directory with your database connection settings. Modify the `DATABASES` section accordingly.

10. Run the migrations:

```shell
python manage.py migrate
```

11. Collect the static files:

```shell
python manage.py collectstatic --no-input
```

12. Go back to the PythonAnywhere Dashboard and navigate to the "Web" tab.

13. Click on the "Add a new web app" button.

14. Select the manual configuration option, choose the Python version, and select the virtual environment you created.

15. In the "Code" section, enter the location to your `manage.py` file (e.g., `/home/your_username/taskux/backend/manage.py`).

16. In the "Working Directory" field, enter the location to your project directory (e.g., `/home/your_username/taskux/backend/`).

17. In the "Source Code" field, enter the location to your static files (e.g., `/home/your_username/taskux/backend/static/`).

18. Click on the "Next" button, review the summary, and then click "Create".

19. Once the web app is created, go to the "Virtualenv" tab, click on the "Open web app" button, and the application should be running.

20. You can access the Swagger UI for testing and interacting with the API endpoints by appending `/api/schema/swagger-ui/` to your PythonAnywhere domain URL.

21. Once the web app is created, you can access the Task Management Application by visiting your PythonAnywhere domain URL. The application includes the Swagger UI for testing and interacting with the API endpoints. To access the Swagger UI, simply append `/api/schema/swagger-ui/` to your PythonAnywhere domain URL.

For example, if your PythonAnywhere domain is `https://your_domain.pythonanywhere.com/`, you can access the Swagger UI at `https://your_domain.pythonanywhere.com/api/schema/swagger-ui/`.

From the Swagger UI, you can explore all the available API endpoints, send requests, and test the functionality of the Task Management Application.


Please replace `your_domain` with your actual PythonAnywhere domain wherever mentioned.

> Made with ❤️ by Saksham Tolani
