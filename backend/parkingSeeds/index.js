import mongoose from 'mongoose';
import Parking from '../models/parking.js';
import User from '../models/User.js';
import ParkingUser from '../models/parkinguser.js';
import parkingData from './cities.js';

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Connection established');
});


const seedDB = async () => {
    await Parking.deleteMany({});
    const owner = await User.findById('687e8442cc100d826d385948');
    if (!owner) {
        console.log('owner not found')
        process.exit(1);
    }
    else {
        console.log(owner);
    }
    const parkingowner = await ParkingUser.findOne({ user: owner._id });
    for (const data of parkingData) {
        const parking = new Parking({
            ...data,
            owner: owner._id
        });
        await parking.save();
        parkingowner.parkings.push(parking._id);
    }
    await parkingowner.save();
}
seedDB().then(() => { db.close() })


