# MYTINERARY-BACK
-   [API-LINK](https://mytinerary-back-mern.vercel.app/api)
-   [Front live website](https://mytinerary-mern.vercel.app/home)
-   [Front server repository](https://github.com/9Noir/mytinerary-joelalejandrotapiaperez)


The API serves as the backend for a web application, providing various CRUD endpoints for different models and additional functionality like authentication, sorting itineraries by likes, comment management, and like management. Below, you will find comprehensive documentation on how to set up, use, and contribute to this project.

## Table of Contents

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Usage](#usage)
    -   [API Endpoints](#api-endpoints)
    -   [Authentication](#authentication)
    -   [Middleware](#middleware)
-   [Contributing](#contributing)
-   [License](#license)

## Getting Started

These instructions will help you set up and run the Express.js ES6 MongoDB API locally for development and testing purposes.

### Prerequisites

Before you begin, make sure you have the following software installed on your system:

-   [Node.js](https://nodejs.org/)

### Installation

1.  Clone the repository to your local machine:

    ```bash
    git clone https://github.com/9Noir/mytinerary-back-joelalejandrotapiaperez.git
    ```

2.  Clone the repository to your local machine:

    ```
    cd mytinerary-back
    ```

3.  Install the project dependencies:

    ```
    npm install
    ```

4.  Set up your environment variables. Create a .env file in the project root and add the following:

    ```env
    PORT=8000
    MONGODB_URI=your-mongodb-connection-string
    SECRET_KEY=your-secret-key
    GOOGLE_ID =your-google-client-id
    ```

5.  Start the development server:
    ```bash
    npm start
    ```

Your Express.js ES6 MongoDB API should now be running locally at http://localhost:8000.

## API Endpoints

This API provides various endpoints for CRUD operations on different models. Here are the key endpoints:

### User:

-   `POST /api/auth/signup` - Register a new user.
-   `POST /api/auth/signin` - Log in with email and password.
-   `POST /api/auth/google` - Log in with a Google account.
-   `GET /api/users` - Get a list of users (requires authentication).
-   `GET /api/users/:userId` - Get a user by ID (requires authentication).

### City:

-   `GET /api/cities` - Get a list of cities.
-   `GET /api/cities/:cityId` - Get a city by ID.
-   `POST /api/cities` - Create a new city (requires authentication).
-   `PUT /api/cities/:cityId` - Update a city by ID (requires authentication).
-   `DELETE /api/cities/:cityId` - Delete a city by ID (requires authentication).

### Itinerary:

-   `GET /api/itineraries` - Get a list of itineraries.
-   `GET /api/itineraries/:itineraryId` - Get an itinerary by ID.
-   `POST /api/itineraries` - Create a new itinerary (requires authentication).
-   `PUT /api/itineraries/:itineraryId` - Update an itinerary by ID (requires authentication).
-   `DELETE /api/itineraries/:itineraryId` - Delete an itinerary by ID (requires authentication).
-   `GET /api/itineraries/sorted-by-likes` - Get itineraries sorted by likes.

### Activity:

-   `GET /api/activities` - Get a list of activities.
-   `GET /api/activities/:activityId` - Get an activity by ID.
-   `POST /api/activities` - Create a new activity (requires authentication).
-   `PUT /api/activities/:activityId` - Update an activity by ID (requires authentication).
-   `DELETE /api/activities/:activityId` - Delete an activity by ID (requires authentication).

### Like:

-   `POST /api/likes` - Create a like for an itinerary (requires authentication).
-   `DELETE /api/likes/:likeId` - Delete a like by ID (requires authentication).

### Comment:

-   `POST /api/comments` - Create a comment for an itinerary (requires authentication).
-   `DELETE /api/comments/:commentId` - Delete a comment by ID (requires authentication).

## Authentication

Authentication is essential for some API endpoints. You can use the following methods:

**Email and Password:**

-   Register a new user: `POST /api/auth/signup`
-   Log in with email and password: `POST /api/auth/signin`

**Token Authentication:**

-   For endpoints that require authentication, include a valid Bearer Token in the request header: `POST /api/auth/token`

**Google Authentication:**

-   Log in with a Google account: `POST /api/auth/google`

## Middleware

The API uses middleware for security and validation purposes. These include:

-   Hashing user passwords.
-   Checking if an email is already registered.
-   Generating and decoding JWT tokens.
-   Verifying user roles (e.g., admin).

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name.
3. Make your changes and test thoroughly.
4. Create a pull request, clearly explaining the changes you've made.

We welcome contributions and look forward to your input!

## License

This project is licensed under the MIT License.
