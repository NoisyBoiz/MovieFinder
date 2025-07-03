import { Schema } from 'mongoose';

const detail = new Schema({
    _id: {type:Number, ref:"movies"},
    title: {type:String},
    overview: {type:String},
    video: {type:Array},
})

export default detail;