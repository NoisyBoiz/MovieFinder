import Config from './config.jsx';

const commentsService = {
    async getComments(id){
        const url = '/comments/getByMovieId?id='+id;
        const res = await Config.getMethod(url);
        return res.data;
    },

    async createComment(data){
        const url = '/comments/create';
        const res = await Config.postMethod(url,data);
        return res;
    },

    async deleteComment(id){
        const url = '/comments/delete?id='+id;
        const res = await Config.deleteMethod(url);
        return res;
    }
}

export default commentsService;