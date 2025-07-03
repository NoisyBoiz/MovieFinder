import commonListModel from '../Models/commonList.js';
import {model} from 'mongoose';

const theatresModel = model('theatres', commonListModel);

const theatresService = {
    getAllTheatres: () =>{
        return theatresModel.find();
    }
}

export default theatresService;