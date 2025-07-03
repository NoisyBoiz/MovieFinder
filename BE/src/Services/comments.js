import CommentsModel from '../Models/comments.js';
import {model} from 'mongoose';

const commentsModel = model('comments', CommentsModel);

const commentsService = {
    getAllComments: () => {
        return commentsModel.find();
    },
    
    getCommentById: (id) => {
        return commentsModel.findById(id);
    },

    getCommentsByMovieId: (movieId) => {
        return commentsModel.find({idMovie: movieId}).populate('idUser');
    },

    createComment: (data) => {
        return commentsModel.create(data);
    },

    deleteComment: (id) => {
        return commentsModel.findByIdAndDelete(id);
    }

}

export default commentsService;