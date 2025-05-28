# AdviseU-App-Web

## Overview

[Launched here!](https://adviseu.app)

AdviseU-App-Web is the frontend for AdviseU, a web application designed to assist students and advisors at Oregon State University in generating optimal course plans based on degree requirements, preferences, interests, course difficulty, and availability. This repository houses the Next.js application that serves as the user interface for AdviseU.

## Features

- User profile management, including degree details, anticipated graduation date, interests, and preferred course load.
- Course recommendations using a Pinecone vector database for similarity search.
- Comprehensive degree plan and course recommendation system through advanced algorithm techniques.
- Integration with a MongoDB database for course data.
- Server-side embedding generation for real-time query processing.
- Interactive UI built with React and TypeScript.

## Tech Stack

- **Frontend:** Next.js (React, TypeScript)
- **Database:** MongoDB (course data storage)
- **Vector Database:** Pinecone (course similarity search)
- **Hosting:** Vercel (deployment)
- **Backend APIs**: Queries MongoDB and Pinecone (using OpenAI for embeddings) for relevant course recommendations.
- **Backend Server**: Scalable C++ server that hosts the degree-plan scheduling algorithm.

## Setup Instructions

### Prerequisites

- Node.js (>= 18)
- npm or yarn
- Environment variables for MongoDB, Pinecone, and any other API keys

### Installation

```
# Clone the repository
git clone https://github.com/AdviseU/AdviseU-App-Web.git
cd AdviseU-App-Web

# Install dependencies
npm install
```

### Running the development server

```
npm run dev
```

This will start the Next.js development server. By default, the app will be available at `http://localhost:3000/`.

### Environment Variables

Create a `.env.local` file in the root directory and configure the required environment variables which are detailed in `.env.local.example`.

## Deployment

The application is deployed using Vercel which targets the `main` branch. It will automatically redeploy when there are any changes to the `main` branch. To deploy manually:

```
vercel --prod
```

Make sure your environment variables are set up in Vercel before deploying.

## License

This project is licensed under an EULA.

## API Documentation
```yaml
openapi: 3.0.3
info:
  title: AdviseU API
  version: 1.0.0
servers:
  - url: /api
paths:

  /auth/{nextauth+}:
    parameters:
      - name: nextauth
        in: path
        required: true
        schema:
          type: string
        description: catch-all for NextAuth routes
    get:
      summary: NextAuth GET
      responses:
        '200':
          description: Successful authentication response
          content:
            application/json:
              schema: {}
    post:
      summary: NextAuth POST
      responses:
        '200':
          description: Successful authentication response
          content:
            application/json:
              schema: {}

  /courses:
    get:
      summary: Fetch courses
      parameters:
        - in: query
          name: query
          schema:
            type: string
          description: Optional substring to match course number or name
      responses:
        '200':
          description: A list of courses
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Course'
        '500':
          $ref: '#/components/responses/ServerError'

  /degrees:
    get:
      summary: Fetch degrees
      parameters:
        - in: query
          name: query
          schema:
            type: string
          description: Optional substring to match program name
      responses:
        '200':
          description: A list of degrees
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Degree'
        '500':
          $ref: '#/components/responses/ServerError'

  /plans:
    get:
      summary: Fetch authenticated user’s plans
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Array of plans
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Plan'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'
    post:
      summary: Create a new plan
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - plan
              properties:
                plan:
                  $ref: '#/components/schemas/NewPlan'
                generatePlan:
                  type: boolean
      responses:
        '200':
          description: Creation status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'

  /plans/{planId}:
    parameters:
      - in: path
        name: planId
        required: true
        schema:
          type: string
        description: MongoDB ObjectId of the plan
    put:
      summary: Update an existing plan
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - plan
              properties:
                plan:
                  $ref: '#/components/schemas/Plan'
                generatePlan:
                  type: boolean
      responses:
        '200':
          description: Update status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'
    delete:
      summary: Delete a plan
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Deletion status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'

  /terms:
    post:
      summary: Create a term under a plan
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - planId
                - term
              properties:
                planId:
                  type: string
                  description: MongoDB ObjectId of the plan
                term:
                  $ref: '#/components/schemas/NewTerm'
      responses:
        '200':
          description: Creation status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'

  /terms/{termId}:
    parameters:
      - in: path
        name: termId
        required: true
        schema:
          type: string
        description: MongoDB ObjectId of the term
    post:
      summary: (Duplicate POST for term—confirm whether you need this)
      responses:
        '200':
          description: Creation status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean

  /userCourses:
    put:
      summary: Update a course in user’s profile
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - course
              properties:
                course:
                  $ref: '#/components/schemas/Course'
      responses:
        '200':
          description: Update status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'
    delete:
      summary: Remove a course from user’s profile
      security:
        - bearerAuth: []
      parameters:
        - in: query
          name: courseId
          required: true
          schema:
            type: string
          description: course_number of the course to remove
      responses:
        '200':
          description: Deletion status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'

  /userDegrees:
    get:
      summary: Fetch degrees in user’s profile
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Array of user degrees
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Degree'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'
    post:
      summary: Add a degree to user’s profile
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - degree
              properties:
                degree:
                  $ref: '#/components/schemas/Degree'
      responses:
        '200':
          description: Addition status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '401':
          $ref: '#/components/responses/Unauthorized'
        '409':
          description: Degree already added
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
        '500':
          $ref: '#/components/responses/ServerError'

  /userDegrees/{degreeId}:
    parameters:
      - in: path
        name: degreeId
        required: true
        schema:
          type: string
        description: program_name of the degree
    put:
      summary: Update a degree in user’s profile
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - degree
              properties:
                degree:
                  $ref: '#/components/schemas/Degree'
      responses:
        '200':
          description: Update status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'
    delete:
      summary: Remove a degree from user’s profile
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Deletion status
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/ServerError'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  responses:
    BadRequest:
      description: Invalid input
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    Unauthorized:
      description: Authentication failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    ServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

  schemas:
    Error:
      type: object
      properties:
        error:
          type: string

    Course:
      type: object
      properties:
        _id:
          type: string
          description: MongoDB ObjectId
        credits:
          type: string
        course_name:
          type: string
        course_number:
          type: string
        department:
          type: string
        description:
          type: string
        prerequisites:
          type: array
          items:
            type: string
        corequisites:
          type: array
          items:
            type: string
        offerings:
          type: object
          additionalProperties:
            type: object
            properties:
              count:
                type: integer
              results:
                type: array
                items:
                  type: object
                  properties:
                    start_date:
                      type: string
                    end_date:
                      type: string
                    crn:
                      type: string
                    instr:
                      type: string
                    meets:
                      type: string
                    key:
                      type: string
                    mpkey:
                      type: string
                    stat:
                      type: string
                    isCancelled:
                      type: string
                    meetingTimes:
                      type: string
                    schd:
                      type: string
                    ssrFees:
                      type: string
                    camp:
                      type: string
                    no:
                      type: string
              srcdb:
                type: string

    Degree:
      type: object
      properties:
        program_name:
          type: string
        program_code:
          type: string
        description:
          type: string
        version:
          type: number
        options:
          type: array
          items:
            type: string
        offered_locations:
          type: array
          items:
            type: string
        requirements:
          type: array
          items:
            $ref: '#/components/schemas/Requirement'

    Requirement:
      type: object
      properties:
        amount:
          type: string
        series:
          type: array
          items:
            $ref: '#/components/schemas/Series'

    Series:
      type: object
      properties:
        options:
          type: array
          items:
            $ref: '#/components/schemas/Option'

    Option:
      type: object
      properties:
        courses:
          type: array
          items:
            type: string

    NewTerm:
      type: object
      required:
        - name
      properties:
        name:
          type: string
        courses:
          type: array
          items:
            $ref: '#/components/schemas/Course'

    Term:
      allOf:
        - $ref: '#/components/schemas/NewTerm'
        - type: object
          properties:
            _id:
              type: string
              description: MongoDB ObjectId

    NewPlan:
      type: object
      required:
        - name
        - description
        - terms
      properties:
        name:
          type: string
        description:
          type: string
        terms:
          type: array
          items:
            $ref: '#/components/schemas/Term'

    Plan:
      allOf:
        - $ref: '#/components/schemas/NewPlan'
        - type: object
          properties:
            _id:
              type: string
              description: MongoDB ObjectId
```
