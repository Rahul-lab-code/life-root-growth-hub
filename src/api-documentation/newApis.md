
# LifeRoot New API Requirements

## Missions APIs

### Get All Missions
- **Endpoint:** `GET /api/mentor/missions`
- **Description:** Get all missions for mentor
- **Query Parameters:**
  - `type`: Filter by mission type (eco, eq, values)
  - `status`: Filter by status (active, completed)
  - `page`: Pagination page number
  - `limit`: Results per page
- **Response:** Array of mission objects

### Create Mission
- **Endpoint:** `POST /api/mentor/missions`
- **Description:** Create a new mission
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "type": "eco | eq | values",
    "objectives": "string",
    "timeEstimate": "string",
    "points": "number",
    "difficulty": "easy | medium | hard"
  }
  ```

### Get Mission Details
- **Endpoint:** `GET /api/mentor/missions/:missionId`
- **Description:** Get details of a specific mission
- **Response:** Mission object with full details

### Update Mission
- **Endpoint:** `PUT /api/mentor/missions/:missionId`
- **Description:** Update an existing mission
- **Request Body:** Same as create mission

### Delete Mission
- **Endpoint:** `DELETE /api/mentor/missions/:missionId`
- **Description:** Delete a mission

### Get Mission Statistics
- **Endpoint:** `GET /api/mentor/missions/stats`
- **Description:** Get statistics about missions
- **Response:**
  ```json
  {
    "totalMissions": "number",
    "activeMissions": "number",
    "completedMissions": "number",
    "studentProgress": [
      {
        "missionId": "string",
        "studentsStarted": "number",
        "studentsCompleted": "number"
      }
    ]
  }
  ```

## Mission Submissions

### Get Submissions
- **Endpoint:** `GET /api/mentor/missions/submissions`
- **Description:** Get mission submissions for review
- **Query Parameters:**
  - `status`: Filter by status (pending, approved, rejected)
  - `page`: Pagination
- **Response:** Array of submission objects

### Review Submission
- **Endpoint:** `PUT /api/mentor/missions/submissions/:submissionId`
- **Description:** Review a mission submission
- **Request Body:**
  ```json
  {
    "status": "approved | rejected",
    "feedback": "string",
    "points": "number"
  }
  ```
