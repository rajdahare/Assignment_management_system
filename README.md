
# Assignment Submission Portal

This is a backend system for an assignment submission portal built with Node.js, Express, MongoDB, JWT, and bcrypt. The system allows users to upload assignments, and admins can view, accept, or reject those assignments.

## Features

- **Users:**
  - Register and log in.
  - Upload assignments, tagging them to an admin by name.
  
- **Admins:**
  - Register and log in.
  - View assignments tagged to them.
  - Accept or reject assignments.

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose for schema management)
- **Authentication:** JWT (JSON Web Tokens) for user authentication
- **Password Hashing:** bcrypt for securely hashing user/admin passwords
- **Validation:** Middleware for input validation and authentication

---

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/assignment-submission-portal.git
cd assignment-submission-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root of your project with the following variables:

```plaintext
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

- `MONGO_URI`: The MongoDB connection string for your database.
- `JWT_SECRET`: A secret string used to sign the JWT tokens.
- `PORT`: The port on which the server will run (default: `5000`).

### 4. Run the Application

```bash
npm start
```

The server will start at `http://localhost:5000`.

---

## API Endpoints

### **User Endpoints**

#### 1. **Register User**
- **URL:** `POST /api/users/register`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "username": "user1",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "User registered successfully"
    }
    ```

#### 2. **User Login**
- **URL:** `POST /api/users/login`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
    ```json
    {
        "username": "user1",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "token": "<JWT_TOKEN>"
    }
    ```

#### 3. **Upload Assignment**
- **URL:** `POST /api/users/upload`
- **Description:** Upload an assignment to an admin.
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Request Body:**
    ```json
    {
        "task": "Complete the backend system",
        "adminName": "Alok"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "Assignment uploaded successfully"
    }
    ```

#### 4. **Get All Admins**
- **URL:** `GET /api/users/admins`
- **Description:** Fetch all registered admins.
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response:**
    ```json
    [
        {
            "_id": "605c72dc8d0d3a001adfda36",
            "username": "Alok"
        }
    ]
    ```

---

### **Admin Endpoints**

#### 1. **Register Admin**
- **URL:** `POST /api/admins/register`
- **Description:** Registers a new admin.
- **Request Body:**
    ```json
    {
        "username": "Alok",
        "password": "adminpass"
    }
    ```
- **Response:**
    ```json
    {
        "msg": "Admin registered successfully"
    }
    ```

#### 2. **Admin Login**
- **URL:** `POST /api/admins/login`
- **Description:** Logs in an admin and returns a JWT token.
- **Request Body:**
    ```json
    {
        "username": "Alok",
        "password": "adminpass"
    }
    ```
- **Response:**
    ```json
    {
        "token": "<JWT_TOKEN>"
    }
    ```

#### 3. **View Assignments**
- **URL:** `GET /api/admins/assignments`
- **Description:** View all assignments tagged to the logged-in admin.
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Response:**
    ```json
    [
        {
            "_id": "605c736e8d0d3a001adfda39",
            "userId": {
                "_id": "605c72dc8d0d3a001adfda36",
                "username": "user1"
            },
            "task": "Complete the backend system",
            "status": "Pending",
            "createdAt": "2021-03-25T13:52:54.744Z"
        }
    ]
    ```

#### 4. **Accept Assignment**
- **URL:** `POST /api/admins/assignments/:id/accept`
- **Description:** Accepts an assignment.
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Request URL:** `/api/admins/assignments/:id/accept` (replace `:id` with the assignment ID)
- **Response:**
    ```json
    {
        "msg": "Assignment accepted"
    }
    ```

#### 5. **Reject Assignment**
- **URL:** `POST /api/admins/assignments/:id/reject`
- **Description:** Rejects an assignment.
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT_TOKEN>
  ```
- **Request URL:** `/api/admins/assignments/:id/reject` (replace `:id` with the assignment ID)
- **Response:**
    ```json
    {
        "msg": "Assignment rejected"
    }
    ```

---

## Testing

You can test the API endpoints using Postman or any other API testing tool. Here are the test steps:

1. **Register a user** via `/api/users/register`.
2. **Login the user** via `/api/users/login` and get the JWT token.
3. **Register an admin** via `/api/admins/register`.
4. **Login the admin** via `/api/admins/login` and get the JWT token.
5. **Upload an assignment** via `/api/users/upload` as a user.
6. **View assignments** as the admin via `/api/admins/assignments`.
7. **Accept or reject assignments** as the admin.

---

## License

