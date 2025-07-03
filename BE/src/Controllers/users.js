import usersService from "../Services/users.js";
import movieService from "../Services/movies.js";
import ResponseObj from "../ResponseObj/index.js";
import jwt from 'jsonwebtoken';

const usersController = {
    getAllUsers: async () => {
        return ResponseObj(200, "success", await usersService.getAllUsers());
    },
    
    getUserById: async (id) => {
        let user = await usersService.getUserById(id);
        if (user === null || user.length === 0) return ResponseObj(404, "User not found", null);
        return ResponseObj(200, "success", user);
    },

    createUser: async (user) => {
        if(user.name === "" || user.name === null || user.name === undefined) return ResponseObj(300, "Name is not valid", null)
        if(user.email === "" || user.email === null || user.email === undefined) return ResponseObj(300, "Email is not valid", null)
        if(user.password === "" || user.password === null || user.password === undefined) return ResponseObj(300, "Password is not valid", null)
        try{
            await usersService.createUser(user);
            return ResponseObj(200, "success", user);
        }
        catch(err){
            console.log(err);
            return ResponseObj(300, Object.keys(err.keyPattern)[0] + " is exist", null);
        }
    },

    updateUser: async (id,user) => {
        let preUser = await usersService.getUserById(id);
        if(preUser === null || preUser.length === 0) return ResponseObj(300, "User not found", null);
        
        if((user.password === "" || user.password === null || user.password === undefined) && (user.name === "" || user.name === null || user.name === undefined)) return ResponseObj(300, "Nothing is change", null);
        if((user.name !== "" && user.name !== null && user.name !== undefined) && preUser.name === user.name) return ResponseObj(300, "Username is not change", null);
        if((user.password !== "" && user.password !== null && user.password !== undefined) && preUser.password === user.password) return ResponseObj(300, "Password is not change", null);

        try{
            await usersService.updateUser(id, user);
            return ResponseObj(200, "success", user);
        }
        catch(err){
            return ResponseObj(300, "can't update user", null);
        }
    },

    deleteUser: async (id) => {
        try{
            await usersService.deleteUser(id);
            return ResponseObj(200, "success", null);
        }
        catch(err){
            return ResponseObj(300, "User not found", null);
        }
    },

    updateFavorite: async (body) => {
        if(body.id === "" || body.id === null || body.id === undefined) return ResponseObj(300, "Id is not valid", null)
        if(body.idMovie === "" || body.idMovie === null || body.idMovie === undefined) return ResponseObj(300, "Id Movie is not valid", null)
        const user = await usersService.getUserById(body.id);
        if(user === null || user.length === 0) return ResponseObj(300, "User not found", null);
        const movie = await movieService.getMovieById(body.idMovie);
        if(movie === null || movie.length === 0) return ResponseObj(300, "Movie not found", null);
        if(user.favorite.includes(body.idMovie)) user.favorite = user.favorite.filter(fav => fav !== body.idMovie);
        else user.favorite.push(body.idMovie);
        try{
            await usersService.updateFavorite(body.id, user.favorite);
            return ResponseObj(200, "success", user.favorite);
        }
        catch(err){
            return ResponseObj(300, "can't update favorite", null);
        }
    },

    getFavorite: async(id) => {
        const user = await usersService.getUserById(id);
        if(user === null || user.length === 0) return ResponseObj(300, "User not found", null);
        return ResponseObj(200, "success", user.favorite);
    },

    login: async (body) => {
        if(body.email === "" || body.email === null || body.email === undefined) return ResponseObj(300, "Email is not valid", null)
        if(body.password === "" || body.password === null || body.password === undefined) return ResponseObj(300, "Password is not valid", null)
        const user = await usersService.login(body.email, body.password);
        if(user === null || user.length === 0) return ResponseObj(300, "Email or password is not correct", null);
        const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'});
        return ResponseObj(200, "success", {"token": token, "id": user._id, "name": user.name});
    },
}

export default usersController;