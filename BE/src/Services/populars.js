import commonListModel from '../Models/commonList.js';
import {model} from 'mongoose';

const popularsModel = model('populars', commonListModel);

const popularsService = {
    getAllPopular: () =>{
        return popularsModel.find();
    }
}

export default popularsService;