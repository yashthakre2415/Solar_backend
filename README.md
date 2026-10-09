# SolarApp Admin Panel ☀️

SolarApp Admin Panel is a backend application developed to manage solar services, employees, service requests, and expense operations through RESTful APIs.

## Features

- Employee expense management
- Retrieve expenses by employee and status
- Approve and reject expense requests
- Pending expense count
- Customer service history
- Salary-related operations
- Image upload using Multer
- Authentication middleware
- MySQL database integration
- API testing with Postman

## Tech Stack

- Node.js
- Express.js
- JavaScript
- MySQL
- Multer
- Postman
- Git and GitHub

## Project Structure

    SolarApp-Admin-Panel/
    ├── controller/
    ├── model/
    ├── routes/
    ├── middleware/
    ├── db/
    ├── uploads/
    ├── package.json
    ├── package-lock.json
    └── README.md

## Installation and Setup

### 1. Clone the Repository

    git clone <your-repository-url>

### 2. Navigate to the Project

    cd <your-project-folder>

### 3. Install Dependencies

    npm install

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the environment variables required by your project.

Example:

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=your_database
    JWT_SECRET=your_secret_key

Use the actual variable names expected by your application.

### 5. Start the Server

    npm start

Check `package.json` if your project uses a different start command.

## Expense Management APIs

Assuming the router is mounted at `/hr`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/hr/expenses?userId=8&status=pending` | Get expenses by employee and status |
| GET | `/hr/expenses/pending-count` | Get pending expense count |
| PATCH | `/hr/expenses/:id/approve` | Approve an expense |
| PATCH | `/hr/expenses/:id/reject` | Reject an expense |

### Example Requests

Get pending expenses:

    GET /hr/expenses?userId=8&status=pending

Get pending expense count:

    GET /hr/expenses/pending-count

Approve an expense:

    PATCH /hr/expenses/5/approve

Reject an expense:

    PATCH /hr/expenses/4/reject

Protected routes may require a Bearer Token in the Authorization header.

## Database

The application uses MySQL to store application data.

Example query to retrieve expenses:

    SELECT * FROM employee_expenses;

Example query to retrieve pending expenses:

    SELECT *
    FROM employee_expenses
    WHERE status = 'pending';

## API Testing

Postman can be used to test the application's APIs.

1. Start the backend server.
2. Configure the request URL and HTTP method.
3. Add query parameters and request data where required.
4. Add a valid Bearer Token for protected endpoints.
5. Verify the response and database changes.

## Security

- Keep credentials in environment variables.
- Do not commit `.env` files or secret keys to GitHub.
- Validate incoming request data.
- Protect private endpoints with authentication middleware.
- Validate uploaded files.

## Author

Yash Thakre
