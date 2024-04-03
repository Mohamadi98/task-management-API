# Sales Management API
## Run The Project
- Clone the project locally using `git clone https://github.com/Mohamadi98/task-management-API.git`
- Install the dependencies using `npm install`
- Run the server with `npm start`
- Run tests with `npm test`
## API Endpoint
### GET /tasks
- Description
    - Gets all tasks available
- Parameters
    - page: a path query to select a page number, default value of 1, `/tasks?page=2`
    - limit: a path query to select the number of tasks within a page, `/tasks?page=2&limit=4`
    - sorted: a path query to sort task on updatedAt field, to apply sort provide a value of 1, `/tasks?sorted=1`
- Expected Status code
    - 200
### Get /tasks/:id
- Description
    - Gets the task matching the id
- Parameters
    - id: a path parameter representing the task entry id field, `/tasks/1sd2`
- Expected Status Code:
    - On Success 200
    - On Failure 404
### POST /tasks
- Description
    - Creates a new task entry
- Parameters
    - title: a request body parameter (required)
    - description: a request body parameter (required)
- Expected Status Code
    - On Success 201
    - On Failure 400
### PUT /tasks/:id
- Description
    - Update a task entry fields (only title and description)
- Parameters
    - id: a path parameter representing the task entry id
    - title: a request body parameter (optional)
    - description: a request body parameter (optional)
- Note
    - request body must contain either title or descritpion or both
- Expected Status Code
    - On Success 200
    - On Failure 404 (failure to find the entry)
    - On Failure 400
### DELETE /tasks/:id
- Description
    - deletes the task matching the id
- Parameters
    - id: a path parameter representing the task entry id field
- Expected Status Code:
    - On Success 200
    - On Failure 404





