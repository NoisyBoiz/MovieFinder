import Config from './config.jsx';

const moviesService = {
    async getMovieById(id, language) {
        const url = '/movies/getById?id='+id + '&language=' + language;
        const res = await Config.getMethod(url);
        return res.data;
    },

    async getMovieByUser(ids,language) {
        const url = '/movies/getByUser?id='+ids+'&language=' + language;
        const res = await Config.getMethod(url);
        return res.data;
    },

    async getMovies(type,language) {
        const url = '/movies/'+ type+'?language='+language;
        const res = await Config.getMethod(url);
        return res.data;
    },     

    async getMoviesByTitle(title,language) {
        const url = '/movies/getByTitle?title='+ title+'&language='+language;
        const res = await Config.getMethod(url);
        return res.data;
    },
    async filterMovies(query,language) {
        const url = '/movies/filter?'+ query +'&language=' +language;
        const res = await Config.getMethod(url);
        return res.data;
    },

    async getCast(id){
        const url = '/casts/getByListId?id='+id;
        const res = await Config.getMethod(url);
        return res.data;
    },
}

export default moviesService;