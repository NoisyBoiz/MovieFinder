import { Schema } from 'mongoose';

const genres = new Schema({
    _id: {type:Number},
    name: {type:String},
})

export default genres;