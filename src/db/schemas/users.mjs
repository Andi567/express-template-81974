import mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    lastMsgId: { type: Number }
  },
  {
    timestamps: true
  }
);
