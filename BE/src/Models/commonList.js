import { Schema } from 'mongoose';

const commonList = new Schema({
    id_movie: {type:Number, unique:true},
})

export default commonList;