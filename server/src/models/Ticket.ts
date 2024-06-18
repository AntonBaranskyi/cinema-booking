import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  row: Number,
  seat: Number,
  price: Number,
  isSell: Boolean,
});

export default mongoose.model('Ticket', TicketSchema);
