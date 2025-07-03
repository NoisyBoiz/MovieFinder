import { Router } from "express";
import commentController from "../Controllers/comments.js";
import AuthenToken from "../Services/authenToken.js";
const router = Router();

router.get('/list', async (req, res) => {
    const result = await commentController.getAllComments();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await commentController.getCommentById(id);
    res.status(result.status).json(result);
});

router.get("/getByMovieId", async (req, res) => {
    let movieId = req.query.id;
    const result = await commentController.getCommentsByMovieId(movieId);
    res.status(result.status).json(result);
});

router.post("/create", AuthenToken, async (req, res) => {
    const data = req.body;
    const result = await commentController.createComment(data);
    res.status(result.status).json(result);
});

router.delete("/delete", AuthenToken, async (req, res) => {
    let id = req.query.id;
    const result = await commentController.deleteComment(id);
    res.status(result.status).json(result);
});

export default router;