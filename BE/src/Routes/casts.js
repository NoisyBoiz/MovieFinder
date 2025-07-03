import { Router } from "express";
import castsController from "../Controllers/casts.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await castsController.getAllCast();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await castsController.getCastById(id);
    res.status(result.status).json(result);
});

router.get("/getByListId", async (req, res) => {
    let id = req.query.id;
    const result =  await castsController.getCastByMovieId(id);
    res.status(result.status).json(result);
});

export default router;