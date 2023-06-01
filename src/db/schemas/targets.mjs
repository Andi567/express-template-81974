import mongoose from 'mongoose';

export const TargetsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    exchange: String,
    asset: String,
    fiat: String,
    payId: String,
    tradeMethod: String,
    targetDiff: Number,
    minAmount: Number,
    maxAmount: Number,
    isActive: Boolean
  },
  {
    timestamps: true
  }
);
