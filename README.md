# Facebook-like Application

A simple Facebook-like application built with **Express** and **Sequelize** that handles users, posts, and comments. The application supports user registration, post creation, comment management, and relation handling between users, posts, and comments.

## Features

- User registration
- CRUD operations for posts and comments
- Only post authors can edit or delete (soft delete) their posts
- Get specific posts with author details and associated comments
- Sequelize ORM for database interaction

## Endpoints

### User Management

- **POST** `/register`  
  Register a new user.

### Post Management

- **POST** `/posts`  
  Create a new post.

- **GET** `/posts`  
  Get all posts.

- **GET** `/posts/:id`  
  Get a specific post by ID along with the author details and comments.

- **PUT** `/posts/:id`  
  Update a post (only by the author).

- **DELETE** `/posts/:id`  
  Soft delete a post (only by the author).

### Comment Management

- **POST** `/posts/:postId/comments`  
  Add a comment to a specific post.

- **GET** `/posts/:postId/comments`  
  Get all comments for a specific post.

- **PUT** `/comments/:id`  
  Update a specific comment (only by the commenter).

- **DELETE** `/comments/:id`  
  Delete a comment (only by the commenter).

### Special Endpoints

- **GET** `/users/:id/posts/:postId/comments`  
  Get a specific user’s post and the associated comments.

- **GET** `/posts/:id/author`  
  Get a post with the author details.

## Technologies Used

- **Express.js**: Web framework for Node.js
- **Sequelize**: ORM for database management
- **SQLite**: Simple file-based database used in development
- **bcrypt.js**: Secure password hashing
