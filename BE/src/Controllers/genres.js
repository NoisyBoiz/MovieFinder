import genresService from "../Services/genres.js";
import ResponseObj from "../ResponseObj/index.js";

const genresController = {
    getAllGenres: async () => {
        return ResponseObj(200, "success", await genresService.getAllGenres());
    },
    getGenreById: async (id) => {
        return ResponseObj(200, "success", await genresService.getGenreById(id));
    }
}

export default genresController;    