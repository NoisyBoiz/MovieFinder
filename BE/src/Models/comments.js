import { Schema, Types } from 'mongoose';

const comments = new Schema({
    _id: {type:Types.ObjectId, auto:true},
    idUser: {type:Types.ObjectId, ref: 'users'},
    idMovie: {type:Number},
    content: {type:String},
    createdAt: {type:Date, default: Date.now},
})

export default comments;