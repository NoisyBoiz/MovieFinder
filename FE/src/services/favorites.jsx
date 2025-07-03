import Config from './config.jsx';

const favoritesService = {
    async getFavorite(id){
        const res = await Config.getMethod('/users/getFavorite?id='+id);
        return res.data;
    },

    async updateFavorite(data){
        const res = await Config.postMethod('/users/updateFavorite', data);
        return res
    },
}

export default favoritesService;