import { Router } from "express";
import moviesController from '../Controllers/movies.js';    

const router = Router();

router.get('/list', async (req, res) => {
    let language = req.query.language;
    const result = await moviesController.getAllMovies(language);
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let language = req.query.language;
    let id = req.query.id;
    const result = await moviesController.getMovieById(language,id);
    res.status(result.status).json(result);
});

router.get("/getByUser", async (req, res) => {
    let language = req.query.language;
    let id = req.query.id;
    const result = await moviesController.getMovieByUser(language,id);
    res.status(result.status).json(result);
});

router.get("/getByTitle", async (req, res) => {
    let language = req.query.language;
    let title = req.query.title;
    const result = await moviesController.getMoviesByTitle(language,title);
    res.status(result.status).json(result);
});

router.get("/getByGenres", async (req, res) => {
    let language = req.query.language;
    let genres = req.query.genres;
    const result = await moviesController.getMoviesByGenres(language,genres);
    res.status(result.status).json(result);
});

router.get("/filter", async (req, res) => {
    let language = req.query.language;
    let genres = req.query.genres;
    let sort_by = req.query.sort_by;
    const result = await moviesController.filterMovies(language,genres,sort_by);
    res.status(result.status).json(result);
});

router.get("/upcoming", async(req, res)=>{
    let language = req.query.language;
    const result = await moviesController.getMovieByType(language, "upcomings");
    res.status(result.status).json(result);
})

router.get("/popular", async(req, res)=>{
    let language = req.query.language;
    const result = await moviesController.getMovieByType(language, "populars");
    res.status(result.status).json(result);
})  

router.get("/trending/day", async(req, res)=>{
    let language = req.query.language;
    const result = await moviesController.getMovieByType(language, "trendingDays");
    res.status(result.status).json(result);
})

router.get("/trending/week", async(req, res)=>{
    let language = req.query.language;
    const result = await moviesController.getMovieByType(language, "trendingWeeks");
    res.status(result.status).json(result);
})

router.get("/theatres", async(req, res)=>{
    let language = req.query.language;
    const result = await moviesController.getMovieByType(language, "theatres");
    res.status(result.status).json(result);
})

router.get("/favorites", async(req, res)=>{
    let language = req.query.language;
    let id = req.query.id;
    const result = await moviesController.getMovieByUser(language, id)
    res.status(result.status).json(result);
})


export default router;