import commonListModel from '../Models/commonList.js';
import {model} from 'mongoose';

const upcomingsModel = model('upcomings', commonListModel);

const upcomingsService = {
    getAllUpcoming: () =>{
        return upcomingsModel.find();
    }
}

export default upcomingsService;