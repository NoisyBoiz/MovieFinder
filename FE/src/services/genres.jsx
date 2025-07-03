import Config from './config.jsx';

const genresService = {
    async getAllGenres() {
        const url = '/genres/list';
        const res = await Config.getMethod(url);
        return res.data;
    },     
}

export default genresService;