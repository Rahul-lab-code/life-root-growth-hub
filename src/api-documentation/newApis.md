# New API Requirements for LifeRoot Application

## Student Prakriti Assessment

### GET /api/student/prakriti-assessment

Retrieves the student's Prakriti assessment results.

**Response**
```json
{
  "id": "string",
  "studentId": "string",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)",
  "answers": {
    "1": "vata|pitta|kapha",
    "2": "vata|pitta|kapha",
    // ... other question answers
  },
  "result": {
    "type": "vata|pitta|kapha|vata-pitta|pitta-kapha|vata-kapha|balanced",
    "description": "string",
    "recommendations": ["string", "string", ...]
  }
}
```

### POST /api/student/prakriti-assessment

Saves a new Prakriti assessment result for the student.

**Request Body**
```json
{
  "answers": {
    "1": "vata|pitta|kapha",
    "2": "vata|pitta|kapha",
    // ... other question answers
  }
}
```

**Response**
```json
{
  "id": "string",
  "studentId": "string",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)",
  "answers": {
    "1": "vata|pitta|kapha",
    "2": "vata|pitta|kapha",
    // ... other question answers
  },
  "result": {
    "type": "vata|pitta|kapha|vata-pitta|pitta-kapha|vata-kapha|balanced",
    "description": "string",
    "recommendations": ["string", "string", ...]
  }
}
```

### GET /api/student/prakriti-assessment/history

Retrieves the history of student's Prakriti assessments.

**Response**
```json
[
  {
    "id": "string",
    "studentId": "string",
    "createdAt": "string (ISO date)",
    "result": {
      "type": "vata|pitta|kapha|vata-pitta|pitta-kapha|vata-kapha|balanced"
    }
  },
  // ... other assessment history items
]
```

### GET /api/mentor/students/:studentId/prakriti-assessment

Allows mentors to view a specific student's Prakriti assessment.

**Response**
```json
{
  "id": "string",
  "studentId": "string",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date)",
  "answers": {
    "1": "vata|pitta|kapha",
    "2": "vata|pitta|kapha",
    // ... other question answers
  },
  "result": {
    "type": "vata|pitta|kapha|vata-pitta|pitta-kapha|vata-kapha|balanced",
    "description": "string",
    "recommendations": ["string", "string", ...]
  }
}
```

## Data Models

### PrakritiAssessment
- id: string (unique identifier)
- studentId: string (foreign key to User)
- createdAt: Date
- updatedAt: Date
- answers: Record<string, 'vata' | 'pitta' | 'kapha'> (mapping of question IDs to selected answers)
- result: {
  - type: 'vata' | 'pitta' | 'kapha' | 'vata-pitta' | 'pitta-kapha' | 'vata-kapha' | 'balanced'
  - description: string
  - recommendations: string[]
}

## Integration Notes

1. The Prakriti assessment should be automatically analyzed on the backend to determine the dominant dosha(s) and provide appropriate recommendations.

2. Assessment results should be stored to track changes in a student's Prakriti over time.

3. Mentors should be able to view their students' Prakriti assessments to tailor their teaching approaches accordingly.

4. The assessment should be available to students at any time, with a recommendation to complete it at the beginning of each school year.
