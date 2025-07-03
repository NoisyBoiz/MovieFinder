import {model} from 'mongoose';
import MoviesDetailModel from '../Models/moviesDetail.js';

const movies = model('movies', MoviesDetailModel);
const moviesDetailEN = model('movies_detail_ens', MoviesDetailModel);
const moviesDetailVI = model('movies_detail_vis', MoviesDetailModel);
const moviesDetailJA = model('movies_detail_jas', MoviesDetailModel);
const moviesDetailRU = model('movies_detail_rus', MoviesDetailModel);
const moviesService = {
    getAllMovies: (language) => {
        if(language === 'vi') return moviesDetailVI.find().populate('_id');
        else if(language === 'ja') return moviesDetailJA.find().populate('_id');
        else if(language === 'ru') return moviesDetailRU.find().populate('_id');
        return moviesDetailEN.find().populate('_id');
    },

    getMovieByIdOriginal: (id) => {
        return movies.findOne({_id: id});
    },

    getMovieById: (id, language) => {
        if(language === 'vi') return moviesDetailVI.findOne({_id: id}).populate('_id');
        else if(language === 'ja') return moviesDetailJA.findOne({_id: id}).populate('_id');
        else if(language === 'ru') return moviesDetailRU.findOne({_id: id}).populate('_id');
        return moviesDetailEN.findOne({_id: id}).populate('_id');
    },

    getMovieByListId: (listId, language) => {
        if(language === 'vi') return moviesDetailVI.find({_id: {$in: listId}}).populate('_id');
        else if(language === 'ja') return moviesDetailJA.find({_id: {$in: listId}}).populate('_id');
        else if(language === 'ru') return moviesDetailRU.find({_id: {$in: listId}}).populate('_id');
        return moviesDetailEN.find({_id: {$in: listId}}).populate('_id');
    },

    getMovieByTitle: async (title, language) => {
        let movie = await movies.find({original_title: {$regex: title, $options: 'i'}});
        if(movie.length === 0) return [];
        let listId = movie.map(m => m._id);
        if(language === 'vi') return moviesDetailVI.find({_id: {$in: listId}}).populate('_id');
        else if(language === 'ja') return moviesDetailJA.find({_id: {$in: listId}}).populate('_id');
        else if(language === 'ru') return moviesDetailRU.find({_id: {$in: listId}}).populate('_id');
        return moviesDetailEN.find({_id: {$in: listId}}).populate('_id');
    },

    getMovieByGenre: async (genres, language) => {
        let movie = await movies.find({genre_ids: {$elemMatch: {$in: genres}}})
        if(movie.length === 0) return [];
        let listId = movie.map(m => m._id);
        if(language === 'vi') return moviesDetailVI.find({_id: {$in: listId}}).populate('_id');
        else if(language === 'ja') return moviesDetailJA.find({_id: {$in: listId}}).populate('_id');
        else if(language === 'ru') return moviesDetailRU.find({_id: {$in: listId}}).populate('_id');
        return moviesDetailEN.find({_id: {$in: listId}}).populate('_id');
    },

    filterMovies: async (language, genres, sortBy) => {
        if(sortBy == 'vote_average.desc') sortBy = {vote_average: -1};
        else if(sortBy == 'vote_average.asc') sortBy = {vote_average: 1};
        else if(sortBy == 'release_date.desc') sortBy = {release_date: -1};
        else if(sortBy == 'release_date.asc') sortBy = {release_date: 1};
        else if(sortBy == 'vote_count.desc') sortBy = {vote_count: -1}; 
        else if(sortBy == 'vote_count.asc') sortBy = {vote_count: 1};
        else {
            if(genres.length == 0){
                if(language === 'vi') return moviesDetailVI.find().populate('_id');
                else if(language === 'ja') return moviesDetailJA.find().populate('_id');
                else if(language === 'ru') return moviesDetailRU.find().populate('_id');
                return moviesDetailEN.find().populate('_id');
            }
            else{
                let movie = await movies.find({genre_ids: {$elemMatch: {$in: genres}}})
                if(movie.length === 0) return [];
                let listId = movie.map(m => m._id);
                if(language === 'vi') return moviesDetailVI.find({_id: {$in: listId}}).populate('_id');
                else if(language === 'ja') return moviesDetailJA.find({_id: {$in: listId}}).populate('_id');
                else if(language === 'ru') return moviesDetailRU.find({_id: {$in: listId}}).populate('_id');
                return moviesDetailEN.find({_id: {$in: listId}}).populate('_id');
            }
        }
        if(genres.length == 0){
            if(language === 'vi') return moviesDetailVI.find().sort(sortBy).populate('_id');
            else if(language === 'ja') return moviesDetailJA.find().sort(sortBy).populate('_id');
            else if(language === 'ru') return moviesDetailRU.find().sort(sortBy).populate('_id');
            return moviesDetailEN.find().sort(sortBy).populate('_id');
        }
        let movie = await movies.find({genre_ids: {$elemMatch: {$in: genres}}})
        if(movie.length === 0) return [];
        let listId = movie.map(m => m._id);
        if(language === 'vi') return moviesDetailVI.find({_id: {$in: listId}}).sort(sortBy).populate('_id');
        else if(language === 'ja') return moviesDetailJA.find({_id: {$in: listId}}).sort(sortBy).populate('_id');
        else if(language === 'ru') return moviesDetailRU.find({_id: {$in: listId}}).sort(sortBy).populate('_id');
        return moviesDetailEN.find({_id: {$in: listId}}).sort(sortBy).populate('_id');
    },
}

export default moviesService;