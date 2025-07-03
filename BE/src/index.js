import express from 'express';
import connect from './Config/index.js';
import cors from 'cors';
import child_process from 'child_process';
connect();

import moviesRouter from './Routes/movies.js';
import usersRouter from './Routes/users.js';
import genresRouter from './Routes/genres.js';
import commentsRouter from './Routes/comments.js';
import castsRouter from './Routes/casts.js';
import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/genres", genresRouter);
app.use("/comments", commentsRouter);
app.use("/casts", castsRouter);

app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
});