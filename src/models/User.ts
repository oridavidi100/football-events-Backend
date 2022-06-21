import mongoose from 'mongoose';
import { User } from '../../@types/user';

const UserSchema = new mongoose.Schema<User>(
  {
    _id: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    nameOfPet: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', UserSchema);
export { User };
