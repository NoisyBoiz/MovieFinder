import GenresModel from '../Models/genres.js';
import mongoose from 'mongoose';

const genresModel = mongoose.model('genres', GenresModel);

const genresService = {
    getAllGenres: () => {
        return genresModel.find();
    },
    getGenreById: (id) => {
        return genresModel.findById(id);
    }
}

export default genresService;