import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const parkinguserSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle: {
        type: String,
        enum: ['car', 'bike', 'auto']
    },
    parkings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Parking'
        }
    ],
});
export default mongoose.model('ParkingUser', parkinguserSchema);