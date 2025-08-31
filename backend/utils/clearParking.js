import Meta from '../models/meta.js';
import Parking from '../models/parking.js';
import ParkingUser from '../models/parkinguser.js';

async function clearParking() {
    const today = new Date().toDateString();

    let lastCleared = await Meta.findOne({ key: 'lastClearedDate' });

    if (!lastCleared || lastCleared.value !== today) {
        console.log('New day detected. Clearing parking users...');

        await Parking.updateMany({}, [
            { $set: { users: [], availableSlot: "$totalSlot" } }
        ]);

        const users = await ParkingUser.find();
        for (const user of users) {
            const ownedParkings = await Parking.find({ owner: user._id });
            const ownedParkingIds = ownedParkings.map(p => p._id);
            await ParkingUser.updateOne(
                { _id: user._id },
                { $set: { parkings: ownedParkingIds } }
            );
        }

        if (lastCleared) {
            lastCleared.value = today;
            await lastCleared.save();
        } else {
            await Meta.create({ key: 'lastClearedDate', value: today });
        }

        console.log('Cleared parking users successfully.');
    } else {
        console.log('Same day. No need to clear.');
    }
}

export default clearParking;