import CastModel from '../Models/casts.js';
import {model} from 'mongoose';

const castModel = model('casts', CastModel);

const castService = {
    getAllCast: () => {
        return castModel.find();
    },
    getCastById: (id) => {
        return castModel.findById(id);
    },
    getCastByListId: (listId) => {  
        return castModel.find({_id: {$in: listId}});
    },
}

export default castService;