import { Schema, Types } from 'mongoose';

const users = new Schema({
    _id: {type:Types.ObjectId, auto:true},
    name: {type:String},
    avatar: {type:String, default: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"},
    email: {type:String, unique: true},
    password: String,
    createAt: {type:Date,default:Date.now},
    favorite: {type:Array, default:[]},
})

export default users;