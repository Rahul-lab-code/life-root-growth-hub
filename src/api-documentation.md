
# LifeRoot Backend API Documentation

This document outlines all the API endpoints that need to be implemented for the LifeRoot platform.

## Authentication

### Register
- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "student | mentor | admin",
    "school": "string (optional)"
  }
  ```
- **Response:** User object with token

### Login
- **Endpoint:** `POST /api/auth/login`
- **Description:** Login an existing user
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** User object with token

### Logout
- **Endpoint:** `POST /api/auth/logout`
- **Description:** Logout the current user
- **Auth Required:** Yes
- **Response:** Success message

### Get Current User
- **Endpoint:** `GET /api/auth/me`
- **Description:** Get the current user's profile
- **Auth Required:** Yes
- **Response:** User object

## User Management

### Get All Users
- **Endpoint:** `GET /api/users`
- **Description:** Get all users (admin only)
- **Auth Required:** Yes (admin)
- **Query Parameters:**
  - `role`: Filter by role
  - `page`: Pagination
  - `limit`: Results per page
- **Response:** Array of user objects

### Get User
- **Endpoint:** `GET /api/users/:userId`
- **Description:** Get a specific user's profile
- **Auth Required:** Yes
- **Response:** User object

### Update User
- **Endpoint:** `PUT /api/users/:userId`
- **Description:** Update a user's profile (admin or self)
- **Auth Required:** Yes
- **Request Body:** User object (partial)
- **Response:** Updated user object

### Delete User
- **Endpoint:** `DELETE /api/users/:userId`
- **Description:** Delete a user (admin only)
- **Auth Required:** Yes (admin)
- **Response:** Success message

## Missions

### Get All Missions
- **Endpoint:** `GET /api/missions`
- **Description:** Get all missions
- **Auth Required:** Yes
- **Query Parameters:**
  - `category`: Filter by category (eco, eq, values)
  - `status`: Filter by status (available, active, completed)
  - `page`: Pagination
  - `limit`: Results per page
- **Response:** Array of mission objects

### Get Mission
- **Endpoint:** `GET /api/missions/:missionId`
- **Description:** Get a specific mission
- **Auth Required:** Yes
- **Response:** Mission object

### Create Mission
- **Endpoint:** `POST /api/missions`
- **Description:** Create a new mission (admin or mentor)
- **Auth Required:** Yes (admin or mentor)
- **Request Body:** Mission object
- **Response:** Created mission object

### Update Mission
- **Endpoint:** `PUT /api/missions/:missionId`
- **Description:** Update a mission (admin or mentor)
- **Auth Required:** Yes (admin or mentor)
- **Request Body:** Mission object (partial)
- **Response:** Updated mission object

### Delete Mission
- **Endpoint:** `DELETE /api/missions/:missionId`
- **Description:** Delete a mission (admin or mentor)
- **Auth Required:** Yes (admin or mentor)
- **Response:** Success message

### Start Mission
- **Endpoint:** `POST /api/missions/:missionId/start`
- **Description:** Start a mission (student)
- **Auth Required:** Yes (student)
- **Response:** Updated mission progress object

### Submit Mission
- **Endpoint:** `POST /api/missions/:missionId/submit`
- **Description:** Submit a completed mission for review (student)
- **Auth Required:** Yes (student)
- **Request Body:**
  ```json
  {
    "reflection": "string",
    "evidence": [
      {
        "file": "binary data",
        "type": "string",
        "name": "string"
      }
    ]
  }
  ```
- **Response:** Updated mission progress object

### Approve Mission
- **Endpoint:** `PUT /api/missions/:missionId/approve`
- **Description:** Approve a submitted mission (mentor or admin)
- **Auth Required:** Yes (mentor or admin)
- **Request Body:**
  ```json
  {
    "feedback": "string",
    "points": "number (optional)"
  }
  ```
- **Response:** Updated mission progress object

### Reject Mission
- **Endpoint:** `PUT /api/missions/:missionId/reject`
- **Description:** Reject a submitted mission (mentor or admin)
- **Auth Required:** Yes (mentor or admin)
- **Request Body:**
  ```json
  {
    "feedback": "string"
  }
  ```
- **Response:** Updated mission progress object

## AI Mentor

### Chat
- **Endpoint:** `POST /api/ai/chat`
- **Description:** Send a message to the AI and get a response
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "message": "string",
    "context": {
      "mood": "string (optional)",
      "previousMessages": "array (optional)",
      "recentMissions": "array (optional)"
    }
  }
  ```
- **Response:** AI response

### Record Mood
- **Endpoint:** `POST /api/student/mood`
- **Description:** Record a student's mood
- **Auth Required:** Yes (student)
- **Request Body:**
  ```json
  {
    "mood": "string",
    "timestamp": "date",
    "note": "string (optional)"
  }
  ```
- **Response:** Saved mood object

## Journal

### Get Journal Entries
- **Endpoint:** `GET /api/student/journal`
- **Description:** Get all journal entries for the current user
- **Auth Required:** Yes (student)
- **Query Parameters:**
  - `page`: Pagination
  - `limit`: Results per page
  - `startDate`: Filter by start date
  - `endDate`: Filter by end date
- **Response:** Array of journal entry objects

### Get Journal Entry
- **Endpoint:** `GET /api/student/journal/:entryId`
- **Description:** Get a specific journal entry
- **Auth Required:** Yes (student)
- **Response:** Journal entry object

### Create Journal Entry
- **Endpoint:** `POST /api/student/journal`
- **Description:** Create a new journal entry
- **Auth Required:** Yes (student)
- **Request Body:** Journal entry object
- **Response:** Created journal entry object

### Update Journal Entry
- **Endpoint:** `PUT /api/student/journal/:entryId`
- **Description:** Update a journal entry
- **Auth Required:** Yes (student)
- **Request Body:** Journal entry object (partial)
- **Response:** Updated journal entry object

### Delete Journal Entry
- **Endpoint:** `DELETE /api/student/journal/:entryId`
- **Description:** Delete a journal entry
- **Auth Required:** Yes (student)
- **Response:** Success message

## Soul Circles

### Get All Posts
- **Endpoint:** `GET /api/soul-circles/posts`
- **Description:** Get all soul circle posts
- **Auth Required:** Yes
- **Query Parameters:**
  - `category`: Filter by category
  - `page`: Pagination
  - `limit`: Results per page
- **Response:** Array of post objects

### Get Post
- **Endpoint:** `GET /api/soul-circles/posts/:postId`
- **Description:** Get a specific post
- **Auth Required:** Yes
- **Response:** Post object with comments

### Create Post
- **Endpoint:** `POST /api/soul-circles/posts`
- **Description:** Create a new soul circle post
- **Auth Required:** Yes
- **Request Body:** Post object
- **Response:** Created post object

### Update Post
- **Endpoint:** `PUT /api/soul-circles/posts/:postId`
- **Description:** Update a post (author or admin only)
- **Auth Required:** Yes
- **Request Body:** Post object (partial)
- **Response:** Updated post object

### Delete Post
- **Endpoint:** `DELETE /api/soul-circles/posts/:postId`
- **Description:** Delete a post (author or admin only)
- **Auth Required:** Yes
- **Response:** Success message

### Add Comment
- **Endpoint:** `POST /api/soul-circles/posts/:postId/comments`
- **Description:** Add a comment to a post
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "content": "string",
    "isAnonymous": "boolean (optional)"
  }
  ```
- **Response:** Created comment object

### Delete Comment
- **Endpoint:** `DELETE /api/soul-circles/posts/:postId/comments/:commentId`
- **Description:** Delete a comment (author or admin only)
- **Auth Required:** Yes
- **Response:** Success message

### Support Post
- **Endpoint:** `POST /api/soul-circles/posts/:postId/support`
- **Description:** Support/like a post
- **Auth Required:** Yes
- **Response:** Updated support count

### Report Post
- **Endpoint:** `POST /api/soul-circles/posts/:postId/report`
- **Description:** Report a post for moderation
- **Auth Required:** Yes
- **Request Body:**
  ```json
  {
    "reason": "string"
  }
  ```
- **Response:** Success message

## Dashboard

### Get Growth Data
- **Endpoint:** `GET /api/dashboard/growth`
- **Description:** Get user's growth data
- **Auth Required:** Yes
- **Query Parameters:**
  - `period`: week, month, year
- **Response:** Growth data object

### Get Eco Actions
- **Endpoint:** `GET /api/dashboard/eco-actions`
- **Description:** Get user's eco actions
- **Auth Required:** Yes
- **Query Parameters:**
  - `period`: week, month, year
- **Response:** Eco actions data

### Get Emotional Wellness
- **Endpoint:** `GET /api/dashboard/emotional-wellness`
- **Description:** Get user's emotional wellness data
- **Auth Required:** Yes
- **Query Parameters:**
  - `period`: week, month, year
- **Response:** Emotional wellness data

### Get Value Actions
- **Endpoint:** `GET /api/dashboard/value-actions`
- **Description:** Get user's value-based actions
- **Auth Required:** Yes
- **Query Parameters:**
  - `period`: week, month, year
- **Response:** Value actions data

## Leaderboard

### Get School Rankings
- **Endpoint:** `GET /api/leaderboard/schools`
- **Description:** Get school rankings
- **Auth Required:** Yes
- **Query Parameters:**
  - `category`: eco, eq, values, overall
  - `limit`: Number of results
- **Response:** Array of school ranking objects

### Get Student Rankings
- **Endpoint:** `GET /api/leaderboard/students`
- **Description:** Get student rankings (within school or overall)
- **Auth Required:** Yes
- **Query Parameters:**
  - `schoolId`: Filter by school
  - `category`: eco, eq, values, overall
  - `limit`: Number of results
- **Response:** Array of student ranking objects

## Certifications

### Get User Certifications
- **Endpoint:** `GET /api/certifications`
- **Description:** Get user's certifications
- **Auth Required:** Yes
- **Response:** Array of certification objects

### Get Certification
- **Endpoint:** `GET /api/certifications/:certificationId`
- **Description:** Get a specific certification
- **Auth Required:** Yes
- **Response:** Certification object

### Create Certification
- **Endpoint:** `POST /api/certifications`
- **Description:** Create a new certification (admin only)
- **Auth Required:** Yes (admin)
- **Request Body:** Certification object
- **Response:** Created certification object

### Issue Certification
- **Endpoint:** `POST /api/certifications/:certificationId/issue`
- **Description:** Issue a certification to a user (admin or mentor)
- **Auth Required:** Yes (admin or mentor)
- **Request Body:**
  ```json
  {
    "userId": "string",
    "notes": "string (optional)"
  }
  ```
- **Response:** User certification object

### Verify Certification
- **Endpoint:** `GET /api/certifications/verify/:verificationCode`
- **Description:** Verify a certification using its verification code
- **Auth Required:** No
- **Response:** Certification verification object
