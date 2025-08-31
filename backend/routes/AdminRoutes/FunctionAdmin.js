import express from 'express';
import Report from '../../models/reportUser.js';
import User from '../../models/User.js';

const router = express.Router();

router.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json({ reports, message: 'Reports fetched successfully' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error fetching reports'});
    }
})

router.post('/ban', async (req, res) => {
    try {
        const { reportedUser } = req.body;
        const user = await User.findOne({ username: reportedUser });
        user.isBanned = true;
        user.save();
        await Report.deleteMany({ reportedUser });
        res.status(200).json({ message: 'User banned successfully'});
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error banning user'});
    }
})

export default router;