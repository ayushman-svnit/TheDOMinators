import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parkingSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    totalSlots: {
        type: Number,
        required: true
    },
    EVCharging: Boolean,
    BikeWash: Boolean,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }, 
    availableSlots: {
        type: Number,
        required: true
    },
    openTime: {
        type: String,
        required: true
    },
    closeTime: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    users: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            vehicle: {
                type: String,
                enum: ['car', 'auto', 'bike'],
            }
        }
    ]
})
export default mongoose.model('Parking', parkingSchema);