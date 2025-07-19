import mongoose from "mongoose";
const { Schema } = mongoose;

const stopSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    lat:{
        type:Number,
        required:true
    },
    lng:{
        type:Number,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    timetable:[{
        bus_number:{
            type:String,
            required:true
        },
        destination:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        }
    }]
});

const Stop=mongoose.model("Stop",stopSchema);
export default Stop;