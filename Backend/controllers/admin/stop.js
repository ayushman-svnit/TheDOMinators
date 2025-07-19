import Stop from "../../models/stop.js";

export const getStopsList=async (req, res) => {
    try {
        const stops = await Stop.find();
        res.status(200).json(stops);
    } catch (err) {
        console.error('Error fetching stops:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createStop=async (req, res) => {
    try {
        const stop = new Stop(req.body);
        await stop.save();
        res.status(201).json(stop);  // Send the created stop as a response
    } catch (error) {
        console.error('Error saving stop:', error);
        res.status(500).json({ error: 'Failed to create stop' });
    }
};

export const updateStop=async (req, res) => {
  const { id } = req.params;

  try {
    const updatedStop = await Stop.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedStop) {
      return res.status(404).json({ error: 'Stop not found' });
    }

    res.status(200).json(updatedStop);
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ error: 'Failed to update stop' });
  }
};

export const deleteStop=async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStop = await Stop.findByIdAndDelete(id);

    if (!deletedStop) {
      return res.status(404).json({ error: 'Stop not found' });
    }

    res.status(204).send(); // Successfully deleted, no content
  } catch (error) {
    console.error('Delete failed:', error);
    res.status(500).json({ error: 'Failed to delete stop' });
  }
}