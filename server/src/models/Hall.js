import mongoose from 'mongoose';

const HallSchema = new mongoose.Schema({
  row: Number,
  seat: Number,
  price: Number,
  isSell: Boolean,
});

export default mongoose.model('Hall', HallSchema);
