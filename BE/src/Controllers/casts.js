import castService from "../Services/casts.js";
import moviesService from "../Services/movies.js";
import ResponseObj from "../ResponseObj/index.js";
const castsController = {
    getAllCast: async () => {
        return ResponseObj(200,"success", await castService.getAllCast());
    },
    getCastById: async (id) => {
        return ResponseObj(200,"success", await castService.getCastById(id));
    },
    getCastByMovieId: async (id) => {
        const movie = await moviesService.getMovieByIdOriginal(id);
        if(movie === null || movie.length === 0) return ResponseObj(404, "Movie not found", null);
        const listCast = JSON.parse(JSON.stringify(movie)).listCast;
        let listId = [];
        listCast.forEach(async (cast) => {
            listId.push(cast.id);
        });
        const rs = await castService.getCastByListId(listId);
        let result = []
        rs.forEach((r) => {
            let x = listCast.find((l) => l.id === r._id);
            result.push({
                ...r._doc,
                character: x.character,
            });
        });
        return ResponseObj(200,"success", result);
    }
}

export default castsController;