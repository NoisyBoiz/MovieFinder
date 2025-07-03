import { Router } from "express";
import genresController from "../Controllers/genres.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await genresController.getAllGenres();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await genresController.getGenreById(id);
    res.status(result.status).json(result);
});

export default router;