import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  fullName: String,
  phoneNumber: String,
});

export default model('User', UserSchema);
