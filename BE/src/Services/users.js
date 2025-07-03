import usersModel from '../Models/users.js';
import {model, Types} from 'mongoose';

const userModel = model('users', usersModel);

const userService = {
    getAllUsers: () => {
        return userModel.find();
    },
    
    getUserById: (id) => {
        try{
            id = new Types.ObjectId(id);
            return userModel.findOne({_id:id});
        }
        catch(err){
            return null;
        }
    },

    createUser: (user) => {
        return userModel.create(user);
    },

    updateUser: (id, user) => {
        return userModel.findByIdAndUpdate(id, user);
    },

    deleteUser: (id) => {
        return userModel.findByIdAndDelete(id);
    },

    updateFavorite: (id, favorite) => {
        return userModel.findByIdAndUpdate(id, {favorite: favorite});
    },

    login: (email, password) => {
        return userModel.findOne({email: email, password: password});
    },
}

export default userService;