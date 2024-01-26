import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      requird: true
   },
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   friends: {
      type: [String],
      default: []

   },
   requests: {
      type: [String],
      default: []
   }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;