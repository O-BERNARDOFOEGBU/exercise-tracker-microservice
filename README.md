# Exercise Tracker Microservice

The Exercise Tracker Microservice is a RESTful API built with Node.js and MongoDB that allows users to track their exercises. It provides endpoints to create users, add exercises, and retrieve exercise logs.

## Features

Create User: POST /api/users
Endpoint to create a new user by providing a username.

Get Users: GET /api/users
Endpoint to retrieve a list of all users.

Add Exercise: POST /api/users/:\_id/exercises
Endpoint to add a new exercise for a specific user. Requires description, duration, and optionally date.

Get Exercise Log: GET /api/users/:\_id/logs
Endpoint to retrieve the exercise log of a specific user.

Supports optional parameters: from (start date), to (end date), and limit (number of logs to return).

## Getting Started

### Installation

Clone the repository.
Install dependencies with npm install.
Configuration

Create a .env file and add your MongoDB URI as MONGO_URI.
Run the Server

Start the server with npm start.
Usage

Use tools like Postman to interact with the API endpoints.

## Technologies Used

Node.js
Express.js
MongoDB (Mongoose)
CORS for Cross-Origin Resource Sharing

## Example Usage

Create User

```json
POST /api/users
Content-Type: application/json

{
"username": "new_user"
}
```

Add Exercise

```json
POST /api/users/:\_id/exercises
Content-Type: application/json

{
"description": "Jogging",
"duration": 30,
"date": "2023-07-18"
}
```

Get Exercise Log

```json
GET /api/users/:\_id/logs
```

### License

This project is licensed under the MIT License
