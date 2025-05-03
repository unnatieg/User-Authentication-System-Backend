# **Project Overview**

## **Objective**

This project provides the following functionalities:

- **User Registration**: Allows users to sign up by providing an email, password, phone number, and name (first name and last name).
- **User Login**: Authenticates users, allows them to log in using email and password, and returns a JWT token that is required for accessing protected routes such as updating user information.
- **User Profile Update**: Authenticated users can update their profile details (name, password, phone number).
- **Protected Routes**: Specific routes (e.g., profile update) are protected and require a valid JWT token to access.

---

## Installation & Setup

### **Prerequisites**

Before setting up this project, ensure you have the following installed:

- **Node.js** (v14 or above) – [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) – Comes with Node.js
- **MongoDB** instance running – You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution or install MongoDB locally.

### Steps

1. **Clone the repository**
    
    First, clone the repository to your local machine:
    
    ```bash
    git clone https://github.com/unnatieg/User-Authentication-System-Backend.git
    cd User-Authentication-System-Backend
    ```
    
2. **Install dependencies**
    
    Install the required dependencies using npm. These are specified in the `dependencies` and `devDependencies` sections of `package.json`.
    
    ```bash
    npm install
    ```
    
    This will install:
    
    - **bcrypt**: For hashing passwords securely.
    - **body-parser**: To parse incoming request bodies.
    - **cookie-parser**: For parsing cookies.
    - **dotenv**: To load environment variables from a `.env` file.
    - **express**: Web framework for Node.js.
    - **jsonwebtoken**: For generating and verifying JWT tokens.
    - **mongoose**: MongoDB object modeling tool for Node.js.
    - **nodemon**: Development dependency for auto-reloading the server during development.
    
3. **Configure environment variables**
    
    Create a `.env` file in the root directory and set up the following variables:
    
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    
    - **PORT**: The port where your server will run (default: 5000).
    - **MONGO_URI**: The MongoDB connection string, which you can obtain from MongoDB Atlas or set up locally.
    - **JWT_SECRET**: A secret key for signing JWT tokens. Make sure to keep it secure.
    
4. **Start the server**
    
    Run the server with the following command:
    
    ```bash
    npm start
    ```
    
    This command uses `nodemon`, which will automatically restart the server whenever changes are made. The server will run at `http://localhost:5000`.

---

## API Documentation

### Routes Overview

- `POST /signup` – Registers a new user.
- `POST /login` – Authenticates a user and returns a JWT token.
- `PUT /update-password` – Allows users to update their password.
- `PUT /update-phone` – Allows users to update their phone number.
- `PUT /update-firstName` – Allows users to update their first name.
- `PUT /update-lastName` – Allows users to update their last name.

### Detailed API Endpoints

### 1. **User Signup**

- **Endpoint**: `POST /signup`
- **Request Body**:
    
    ```json
    {
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "password": "securepassword",
      "phone": "1234567890"
    }
    ```
    
- **Response**:
    - **Success** (201 Created):
        
        ```json
        {
          "message": "New user data saved",
          "data": { ...userData }
        }
        ```
        
    - **Failure** (400 Bad Request):
        
        ```json
        {
          "message": "All fields are required"
        }
        ```

### 2. **User Login**

- **Endpoint**: `POST /login`
- **Request Body**:
    
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
    
- **Response**:
    - **Success** (200 OK):
        
        ```json
        {
          "message": "Login successful"
        }
        ```
        
    - **Failure** (401 Unauthorized):
        
        ```json
        {
          "error": "Invalid credentials"
        }
        ```

### 3. **Update Password**

- **Endpoint**: `PUT /update-password`
- **Authentication**: JWT Token required (sent via cookies).
- **Request Body**:
    
    ```json
    {
      "oldPassword": "oldpassword",
      "newPassword": "newsecurepassword"
    }
    ```
    
- **Response**:
    - **Success** (200 OK):
        
        ```json
        {
          "message": "Password updated"
        }
        ```
        
    - **Failure** (400 or 401 Bad Request/Unauthorized):
        
        ```json
        {
          "error": "old password is incorrect"
        }
        ```

### 4. **Update Phone Number**

- **Endpoint**: `PUT /update-phone`
- **Authentication**: JWT Token required (sent via cookies).
- **Request Body**:
    
    ```json
    {
      "newPhone": "9876543210"
    }
    ```
    
- **Response**:
    - **Success** (200 OK):
        
        ```json
        {
          "message": "Phone number updated"
        }
        ```
        
    - **Failure** (400 Bad Request):
        
        ```json
        {
          "error": "New phone number is required"
        }
        ```

### 5. **Update First Name**

- **Endpoint**: `PUT /update-firstName`
- **Authentication**: JWT Token required (sent via cookies).
- **Request Body**:
    
    ```json
    {
      "newFirstName": "Jane"
    }
    ```
    
- **Response**:
    - **Success** (200 OK):
        
        ```json
        {
          "message": "updated first name"
        }
        ```
        
    - **Failure** (400 Bad Request):
        
        ```json
        {
          "error": "new first name is required"
        }
        ```

### 6. **Update Last Name**

- **Endpoint**: `PUT /update-lastName`
- **Authentication**: JWT Token required (sent via cookies).
- **Request Body**:
    
    ```json
    {
      "newLastName": "Smith"
    }
    ```
    
- **Response**:
    - **Success** (200 OK):
        
        ```json
        {
          "message": "updated last name"
        }
        ```
        
    - **Failure** (400 Bad Request):
        
        ```json
        {
          "error": "new last name is required"
        }
        ```

---

## Folder Structure

Here’s an overview of the key files and folders in the project:

. ├── controllers/ │ └── userController.js # Contains all user-related API logic ├── models/ │ └── user.js # Mongoose schema for the user model ├── routes/ │ └── userRoutes.js # Contains routes for user authentication and profile management ├── middleware/ │ └── authMiddleware.js # Middleware for verifying JWT tokens ├── .env # Environment variables (not included in the repo) ├── index.js # Main entry point of the application ├── package.json # Project dependencies and scripts └── config/ └── database.config.js # MongoDB connection configuration 




### Explanation:
- **controllers/**: Stores the business logic, like user creation, authentication, profile update, etc.
- **models/**: Contains Mongoose schemas defining the structure of the data in the database.
- **routes/**: Holds all route definitions. For example, `userRoutes.js` for user-specific routes.
- **middleware/**: Contains any middleware, such as JWT verification (`authMiddleware.js`).
- **.env**: A file where you can store sensitive information like database credentials and JWT secret.
- **index.js**: Main entry point for the application that initializes the Express server.
- **config/**: A directory where configuration files (like for MongoDB) can be stored.



---

## Key Concepts & Security

- **JWT Authentication**: The system uses JWT tokens for authenticating requests. A valid token is required for any update operation (password, phone, name). Tokens are sent in cookies for secure transport.
- **Password Hashing**: User passwords are securely hashed using **bcrypt** before storing in the database, ensuring passwords are not saved in plain text.

---

## Future Improvements

- Add password reset functionality via email.
- Implement user email verification upon signup.
- Add rate-limiting to protect against brute force attacks.

