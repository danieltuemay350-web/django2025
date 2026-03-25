# Social Media API

Backend social media service built with Django REST Framework and JWT authentication. The API supports user registration and login, posts, comments, likes, follows, pagination, filtering, and ownership-based permissions.

## Stack

- Django 5
- Django REST Framework
- JWT with `djangorestframework-simplejwt`
- SQLite by default, PostgreSQL optional
- Docker, Gunicorn, Nginx

## Project structure

```text
.
|-- backend
|   |-- apps
|   |   |-- authentication
|   |   |-- comments
|   |   |-- follows
|   |   |-- likes
|   |   |-- posts
|   |   |-- users
|   |   `-- api_common
|   |-- config
|   |-- manage.py
|   `-- requirements.txt
|-- docs
|   `-- social_media_api.postman_collection.json
|-- frontend
|   |-- src
|   |   |-- app
|   |   |-- components
|   |   |-- lib
|   |   `-- types
|   `-- package.json
|-- docker-compose.yml
|-- nginx
|   `-- default.conf
`-- README.md
```

## Features

- JWT authentication with access and refresh tokens
- Custom user model
- CRUD operations for posts
- Create, update, delete, and list comments
- Like and unlike posts
- Follow and unfollow users
- Pagination and search/filter support on list endpoints
- Admin moderation through Django admin
- Standardized JSON error responses
- Styled Next.js frontend for login, registration, and social feed interactions

## Data model

- `User`: custom Django user with bio and timestamps
- `Post`: user-authored content
- `Comment`: comments attached to posts
- `Like`: unique like per user and post
- `Follow`: follower-following relationship with self-follow prevention

## Setup

### Local setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Default API base URL: `http://127.0.0.1:8000/`

### Environment

`backend/.env.example` includes:

- `DB_ENGINE=sqlite` for zero-config local development
- PostgreSQL variables when `DB_ENGINE=postgresql`
- token lifetime settings
- page size and CORS settings

### Docker setup

```bash
docker compose up --build
```

This starts:

- `api` on port `8000`
- `nginx` on port `80`

### Frontend setup

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

Frontend URLs:

- `http://localhost:3000/`
- `http://localhost:3000/login`
- `http://localhost:3000/register`
- `http://localhost:3000/feed`

## API endpoints

### Authentication

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/token/refresh/`

### Users

- `GET /api/users/`
- `GET /api/users/{id}/`
- `GET /api/users/me/`
- `PATCH /api/users/me/`
- `POST /api/users/{id}/follow/`
- `DELETE /api/users/{id}/follow/`
- `GET /api/follows/?type=followers`
- `GET /api/follows/?type=following`

### Posts

- `GET /api/posts/`
- `POST /api/posts/`
- `GET /api/posts/{id}/`
- `PUT /api/posts/{id}/`
- `PATCH /api/posts/{id}/`
- `DELETE /api/posts/{id}/`
- `POST /api/posts/{id}/like/`
- `DELETE /api/posts/{id}/like/`
- `GET /api/posts/{id}/comments/`
- `POST /api/posts/{id}/comments/`

### Comments

- `GET /api/comments/{id}/`
- `PUT /api/comments/{id}/`
- `PATCH /api/comments/{id}/`
- `DELETE /api/comments/{id}/`

## Filtering and pagination

### Posts

- `?author=<user_id>` filters by author
- `?mine=true` returns the authenticated user's posts
- `?feed=true` returns posts from followed users
- `?search=<text>` searches post content and author username
- `?ordering=-created_at` sorts results

### Pagination

- `?page=1`
- `?page_size=10`

## Example requests

### Register

```http
POST /api/auth/register/
Content-Type: application/json

{
  "username": "alice",
  "email": "alice@example.com",
  "password": "StrongPass123!",
  "first_name": "Alice",
  "last_name": "Doe",
  "bio": "I build APIs"
}
```

### Login

```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "alice",
  "password": "StrongPass123!"
}
```

### Create a post

```http
POST /api/posts/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "content": "Hello from Django REST Framework"
}
```

### Comment on a post

```http
POST /api/posts/1/comments/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "content": "Great post!"
}
```

## Running tests

```bash
cd backend
python manage.py test
```

## Documentation

- Postman collection: `docs/social_media_api.postman_collection.json`

## Notes

- Only authenticated users can create or modify protected resources.
- Users can only update or delete their own posts and comments.
- SQLite is the default database so the project can run immediately after cloning.
