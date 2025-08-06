# 🎬 Movie Search Website

A full-stack web application for searching movies, using **ReactJS** for the frontend, **Node.js + Express** for the backend
, **MongoDB** as the database. Users can browse, search, and view details of movies stored in a MongoDB database. 

## 🌐 WebSite
https://find-movie-sepia.vercel.app/

## 📁 Project Structure

```
MovieFinder/
├── BE/                     # Backend - Node.js + Express
│   ├── src/
│   │   ├── Config/         # Configuration (DB, API)
│   │   ├── Controllers/    # Request logic handlers
│   │   ├── Models/         # MongoDB schema definitions
│   │   ├── ResponseObj/    # Response structure standardization
│   │   ├── Routes/         # Express routing
│   │   ├── Services/       # Business logic / External API calls
│   │   └── index.js        # Server entry point
│   ├── .env                # Backend environment variables
│   ├── package.json
│   └── package-lock.json
│
├── FE/                     # Frontend - ReactJS
│   ├── public/
│   ├── src/
│   │   ├── component/      # Reusable UI components
│   │   ├── i18n/           # Internationalization files (i18next)
│   │   ├── layout/         # Shared layouts
│   │   ├── pages/          # Main pages (Home, Detail, etc.)
│   │   ├── router/         # React Router configuration
│   │   ├── services/       # Frontend API calls
│   │   ├── styles/         # CSS / Styling framework
│   │   ├── utils/          # Utility functions
│   │   └── index.jsx       # React entry point
│   ├── .env                # Frontend environment variables
│   ├── package.json
│   └── package-lock.json
```


## 🚀 Features

- Search for movies by title
- View movie details (year, genre, plot, poster)
- Internationalization support (i18n)
- Responsive design
- Integration with external movie APIs
- Clean folder structure for both frontend and backend


## 🧑‍💻 Tech Stack

- **Frontend**: ReactJS, Axios, React Router, i18next
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Others**: dotenv, CORS, concurrently


## 🧪 Getting Started

### Clone the Repository

```bash
git clone https://github.com/NoisyBoiz/MovieFinder
```

### Backend Setup
#### 1. Install dependencies
```bash
cd BE
npm install
```

#### 2. Configure Environment Variables
```
ACCESS_TOKEN_SECRET=EXAMPLE
DATABASE_URL=mongodb://localhost:27017/movies
PORT=5000
```

#### 3. Start the Backend
```bash
npm start
```

### Frontend Setup
#### 1. Install dependencies
```bash
cd FE
npm install
```

#### 2. Configure Environment Variables
```
REACT_APP_API_URL=http://localhost:5000
```

#### 3. Start the Frontend
```bash
npm start
```
