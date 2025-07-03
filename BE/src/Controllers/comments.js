import commentsService from '../Services/comments.js';
import moviesService from '../Services/movies.js';
import ResponseObj from '../ResponseObj/index.js';
import usersService from '../Services/users.js';

const commentsController = {
    getAllComments: async () => {
        return ResponseObj(200, "success", await commentsService.getAllComments());
    },
    getCommentById: async (id) => {
        return ResponseObj(200, "success", await commentsService.getCommentById(id));
    },
    getCommentsByMovieId: async (movieId) => {
        return ResponseObj(200, "success", await commentsService.getCommentsByMovieId(movieId));
    },
    createComment: async (data) => {
        if(data.idUser == null || data.idUser == undefined || data.idUser == "") return ResponseObj(300, "idUser is not valid", null);
        if(data.idMovie == null || data.idMovie == undefined || data.idMovie == "") return ResponseObj(300, "idMovie is not valid", null);
        if(data.content == null || data.content == undefined || data.content == "") return ResponseObj(300, "content is not valid", null);
        const movie = await moviesService.getMovieById(data.idMovie);
        if(movie === null || movie.length === 0) return ResponseObj(300, "Movie not found", null);
        const user = await usersService.getUserById(data.idUser);
        if(user === null || user.length === 0) return ResponseObj(300, "User not found", null);
        try{
            await commentsService.createComment(data);
            return ResponseObj(200, "success", data);
        }
        catch(err){
            return ResponseObj(300, "can't create comment", null);
        }
    },
    deleteComment: async (id) => {
        try{
            await commentsService.deleteComment(id);
            return ResponseObj(200, "success", null);
        }
        catch(err){
            return ResponseObj(300, "Comment not found", null);
        }
    }
}

export default commentsController;