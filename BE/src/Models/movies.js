import { Schema } from 'mongoose';

const movies = new Schema({
    _id: {type: Number},
    release_date: {type: String},
    poster_path: {type: String},
    backdrop_path: {type: String},
    vote_average: {type: Number},
    vote_count: {type: Number},
    genre_ids: {type: Array},
    runtime: {type: Number},
    listCast: {type: Array},
    original_title: {type: String},
})

export default movies;