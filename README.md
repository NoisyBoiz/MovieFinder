# 🎬 Movie Search Website

A full-stack web application for searching movies, using **ReactJS** for the frontend, **Node.js + Express** for the backend
, **MongoDB** as the database. Users can browse, search, and view details of movies stored in a MongoDB database. 


## 📁 Project Structure

```
MovieFinder/
├── BE/                     # Backend - Node.js + Express
│   ├── src/
│   │   ├── Config/         # Cấu hình (DB, API)
│   │   ├── Controllers/    # Xử lý logic request
│   │   ├── Models/         # Định nghĩa schema MongoDB
│   │   ├── ResponseObj/    # Chuẩn hóa cấu trúc phản hồi
│   │   ├── Routes/         # Định tuyến Express
│   │   ├── Services/       # Xử lý nghiệp vụ / gọi API ngoài
│   │   └── index.js        # Điểm bắt đầu server
│   ├── .env                # Biến môi trường backend
│   ├── package.json
│   └── package-lock.json
│
├── FE/                     # Frontend - ReactJS
│   ├── public/
│   ├── src/
│   │   ├── component/      # Các component UI dùng lại
│   │   ├── i18n/           # File đa ngôn ngữ (i18next)
│   │   ├── layout/         # Layout dùng chung
│   │   ├── pages/          # Các trang chính (Home, Detail, ...)
│   │   ├── router/         # Cấu hình React Router
│   │   ├── services/       # Gọi API từ frontend
│   │   ├── styles/         # CSS / Framework style
│   │   ├── utils/          # Hàm tiện ích
│   │   └── index.jsx       # Entry point React
│   ├── .env                # Biến môi trường frontend
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
API_URL=http://localhost:5000
```

#### 3. Start the Frontend
```bash
npm start
```
