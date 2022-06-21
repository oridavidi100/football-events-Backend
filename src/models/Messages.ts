import mongoose from 'mongoose';
import { Message } from '../../@types/Message';

const MessageSchema = new mongoose.Schema<Message>(
  {
    name: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model<Message>('Message', MessageSchema);
export { Message };
