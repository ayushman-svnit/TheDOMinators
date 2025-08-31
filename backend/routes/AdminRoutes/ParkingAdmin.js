import express from 'express';
import Parking from '../../models/parking.js';
import ParkingUser from '../../models/parkinguser.js';

const router = express.Router();

// 👥 List all parking users
router.get('/', async (req, res, next) => {
  try {
    // console.log("/parkingusers",req.isAdmin)
    if (!req.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized admin access' });
    }

    const parkingusers = await ParkingUser.find().populate('user');
    res.status(200).json({ parkingusers });
  } catch (err) {
    next(err);
  }
});

// ❌ Delete a parking user
router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized admin access' });
    }

    const { id } = req.params;
    const parkinguser = await ParkingUser.findOne({ _id: id }).populate('parkings');

    if (!parkinguser) {
      return res.status(404).json({ message: 'ParkingUser not found' });
    }

    const user = parkinguser.user;
    const parkings = parkinguser.parkings;

    for (const parking of parkings) {
      const userEntry = parking.users.find(entry => entry.user.equals(user));
      if (userEntry) {
        if (userEntry.vehicle === 'car') parking.availableSlots += 4;
        else if (userEntry.vehicle === 'auto') parking.availableSlots += 2;
        else parking.availableSlots += 1;

        parking.users = parking.users.filter(entry => !entry.user.equals(user));
        await parking.save();
      }
    }

    await Parking.deleteMany({ owner: user });
    await ParkingUser.deleteOne({ _id: id });

    res.status(200).json({ message: 'Parking user deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;