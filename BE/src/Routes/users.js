import { Router } from "express";
import usersController from "../Controllers/users.js";
import AuthenToken from "../Services/authenToken.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await usersController.getAllUsers();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await usersController.getUserById(id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    let user = req.body;
    const result = await usersController.createUser(user);
    res.status(result.status).json(result);
});

router.post("/update", AuthenToken, async (req, res) => {
    let id = req.query.id;
    let user = req.body;
    const result = await usersController.updateUser(id,user);
    res.status(result.status).json(result);
});

router.delete("/delete",  AuthenToken, async (req, res) =>{
    let id = req.query.id;
    const result = await usersController.deleteUser(id);
    res.status(result.status).json(result);
});

router.get("/getFavorite", async (req, res) => {
    let id = req.query.id;
    const result = await usersController.getFavorite(id);
    res.status(result.status).json(result);
});

router.post("/updateFavorite", AuthenToken, async (req, res) => {
    let body = req.body;
    const result = await usersController.updateFavorite(body);
    res.status(result.status).json(result);
});

router.post("/login", async (req, res) => {
    let user = req.body;
    const result = await usersController.login(user);
    res.status(result.status).json(result);
});

router.post("/signup", async (req, res) => {    
    let user = req.body;
    const result = await usersController.createUser(user);
    res.status(result.status).json(result);
});

export default router;