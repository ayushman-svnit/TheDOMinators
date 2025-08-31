import mongoose from "mongoose";
const { Schema } = mongoose;

const visitSchema= new Schema({
    visits:{
        type:Number,
        defalut:0
    }
});

const Visit=mongoose.model("visit",visitSchema);
export default Visit;