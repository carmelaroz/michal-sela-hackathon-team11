# Michal Sela Hackathon Project - Team 11

**Safe Area** is a map-based web application designed to help women in distress quickly find nearby safe zones where they can receive immediate support and protection.

## How to Run the Project

### Running Front-End and Back-End Separately

1. **Back-End**:
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the back-end server:
     ```bash
     npm run dev
     ```
     The back-end will be available at `http://localhost:5000`.

2. **Front-End**:
   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the front-end application:
     ```bash
     npm start
     ```
     The front-end will be available at `http://localhost:3000`.

### Running Both Front-End and Back-End Together Using `concurrently`

1. Install `concurrently`:
   - In the root directory of the project, run:
     ```bash
     npm install concurrently
     ```

2. Run both the back-end and front-end at the same time:
   - In the root directory, execute:
     ```bash
     npm run dev
     ```
     This will start both the back-end and front-end together.

## Technologies Used

### Front-End:
- **React**: A JavaScript library for building user interfaces, used for the client-side of the application.
- **React-Scripts**: A package used to manage the development environment for the React application.
- **Axios**: A promise-based HTTP client for making requests to the back-end API.

### Back-End:
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine, used to create the back-end server.
- **Express.js**: A minimal and flexible Node.js web application framework for building APIs.
- **Nodemon**: A utility that monitors for changes in the application and automatically restarts the server.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file.