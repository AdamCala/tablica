# API Documentation

## Post API

### Get Post by ID
- **Endpoint:** `GET /post/post/:id`
- **Description:** Retrieve a post by its unique ID.
- **Parameters:**
  - `id` (path parameter): The ID of the post to retrieve.
- **Responses:**
  - `200 OK`: Returns the post with the specified ID.
  - `404 Not Found`: If the post with the given ID does not exist.

### Get All Posts
- **Endpoint:** `GET /post/posts`
- **Description:** Retrieve all posts.
- **Responses:**
  - `200 OK`: Returns a list of all posts.

### Create a Post
- **Endpoint:** `POST /post/createPost`
- **Description:** Create a new post.
- **Request Body:**
  - `title` (string): The title of the post.
  - `content` (string): The content of the post.
  - `image` (string): The image URL for the post.
  - `authorId` (number): The ID of the author.
- **Responses:**
  - `201 Created`: Returns the created post.
  - `400 Bad Request`: If required fields are missing or invalid.

### Update a Post
- **Endpoint:** `PUT /post/updatePost`
- **Description:** Update an existing post.
- **Request Body:**
  - `where` (object): Criteria to find the post.
    - `id` (number): The ID of the post to update.
  - `data` (object): Fields to update.
    - `title` (string, optional): New title of the post.
    - `content` (string, optional): New content of the post.
    - `image` (string, optional): New image URL for the post.
- **Responses:**
  - `200 OK`: Returns the updated post.
  - `404 Not Found`: If the post with the given ID does not exist.

### Delete a Post
- **Endpoint:** `DELETE /post/deletePost/:id`
- **Description:** Delete a post by its unique ID.
- **Parameters:**
  - `id` (path parameter): The ID of the post to delete.
- **Responses:**
  - `200 OK`: Returns `true` if the post was successfully deleted.
  - `404 Not Found`: If the post with the given ID does not exist.

## User API

### Get User by ID
- **Endpoint:** `GET /user/user/:id`
- **Description:** Retrieve a user by its unique ID.
- **Parameters:**
  - `id` (path parameter): The ID of the user to retrieve.
- **Responses:**
  - `200 OK`: Returns the user with the specified ID.
  - `404 Not Found`: If the user with the given ID does not exist.

### Get All Users
- **Endpoint:** `GET /user/users`
- **Description:** Retrieve all users.
- **Responses:**
  - `200 OK`: Returns a list of all users.

### Create a User
- **Endpoint:** `POST /user/createUser`
- **Description:** Create a new user.
- **Request Body:**
  - `email` (string): The email of the user.
  - `name` (string): The name of the user.
  - `password` (string): The password of the user.
- **Responses:**
  - `201 Created`: Returns the created user.
  - `400 Bad Request`: If required fields are missing or invalid.

### Update a User
- **Endpoint:** `PUT /user/updateUser`
- **Description:** Update an existing user.
- **Request Body:**
  - `where` (object): Criteria to find the user.
    - `id` (number): The ID of the user to update.
  - `data` (object): Fields to update.
    - `email` (string, optional): New email of the user.
    - `name` (string, optional): New name of the user.
    - `password` (string, optional): New password of the user.
- **Responses:**
  - `200 OK`: Returns the updated user.
  - `404 Not Found`: If the user with the given ID does not exist.

### Login
- **Endpoint:** `POST /user/login`
- **Description:** Authenticate a user.
- **Request Body:**
  - `email` (string): The email of the user.
  - `password` (string): The password of the user.
- **Responses:**
  - `200 OK`: Returns the user ID if authentication is successful.
  - `404 Not Found`: If the user with the given email does not exist or password is incorrect.

### Register
- **Endpoint:** `POST /user/register`
- **Description:** Register a new user.
- **Request Body:**
  - `email` (string): The email of the user.
  - `name` (string): The name of the user.
  - `password` (string): The password of the user.
- **Responses:**
  - `201 Created`: Returns the new user ID.
  - `400 Bad Request`: If the email already exists or if required fields are missing.
