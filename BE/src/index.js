import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './Config/index.js';
dotenv.config();
connect();

import moviesRouter from './Routes/movies.js';
import usersRouter from './Routes/users.js';
import genresRouter from './Routes/genres.js';
import commentsRouter from './Routes/comments.js';
import castsRouter from './Routes/casts.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/genres", genresRouter);
app.use("/comments", commentsRouter);
app.use("/casts", castsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});