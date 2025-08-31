import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    reportedUser: {
        type: String,
        required: true
    },
    comment: {
        type: String, 
        required: true
    }
})

export default mongoose.model('Report', reportSchema);