import express from 'express';
import Parking from '../../models/parking.js';
import { protect } from '../../middleware/auth.js';
import ParkingUser from '../../models/parkinguser.js';

const router = express.Router();

router.route('/')
.post(protect, async (req, res, next) => {
    try {
        const id = req.user._id;
        let parkinguser = await ParkingUser.findOne({ user: id });
        if (!parkinguser) {
            parkinguser = new ParkingUser({ user: id });
            await parkinguser.save();
        }

        req.session.parkinguserId = parkinguser._id;
        const { isOwner } = req.body;

        return res.status(200).json({
            message: 'Role set',
            role: isOwner === 'true' ? 'owner' : 'user'
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
})
.get(async (req, res, next) => {
    try {
        // console.log(req.isAdmin)
        const allParkings = await Parking.find();
        res.status(200).json({ allParkings }); // ✅ JSON response for React
    } catch (e) {
        next(e);
    }
});

export default router;
