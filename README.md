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
