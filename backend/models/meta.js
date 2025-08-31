import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema({
  key: String,
  value: String,
});

export default mongoose.model('Meta', metaSchema);
