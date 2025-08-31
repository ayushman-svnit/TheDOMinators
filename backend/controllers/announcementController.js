import Announcement from "../models/Announcements.js";

const createAnnouncement = async (req, res) => {
    if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized admin access' });
  }
  try {
    const { title, content } = req.body;
    const newAnnouncement = new Announcement({ title, content });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ message: "Error creating announcement", error });
  }
};

const getAnnouncements = async (req, res) => {
    
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements", error });
  }
};

const deleteAnnouncement = async (req, res) => {
    if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized admin access' });
  }
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting announcement", error });
  }
};

const updateAnnouncement = async (req, res) => {
    if (!req.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized admin access' });
  }
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title,
         content,
        createdAt: Date.now() },
      { new: true }
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: "Error updating announcement", error });
  }
};

export {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement
};