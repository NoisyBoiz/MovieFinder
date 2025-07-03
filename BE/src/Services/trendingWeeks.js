import commonListModel from '../Models/commonList.js';
import {model} from 'mongoose';

const trendingWeeksModel = model('trending_weeks', commonListModel);

const trendingWeeksService = {
    getAllTrendingWeek: () =>{
        return trendingWeeksModel.find();
    }
}

export default trendingWeeksService;