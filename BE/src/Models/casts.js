import { Schema } from 'mongoose';

const cast = new Schema({
    _id: {type:Number},
    name: {type:String},
    avatar: {type:String},
})

export default cast;