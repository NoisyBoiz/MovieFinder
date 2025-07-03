import commonListModel from '../Models/commonList.js';
import {model} from 'mongoose';

const trendingDaysModel = model('trending_days', commonListModel);

const trendingDaysService = {
    getAllTrendingDay: () =>{
        return trendingDaysModel.find();
    }
}

export default trendingDaysService;