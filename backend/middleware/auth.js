import User from "../models/User.js";

export const protect = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.isAdmin = false;
        req.isAdmin = false;
        return next();
    }
    if (req.isAdmin) {
        return next();
    }
    res.status(401).json({ message: "Not authorized" });
};

export const BanUser = async (req, res, next) => {
    const id = req.user._id;
    const user = await User.findById(id);
    if (user.isBanned === true)
        return res.status(403).json({ message: "You have been banned " })
    return next();
}