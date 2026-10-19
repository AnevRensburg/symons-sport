import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { REGION_IDS } from './regions.ts';

const dealerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    region: { type: String, required: true, enum: REGION_IDS, index: true },
    /** As displayed, e.g. "021 975 9629". */
    phone: { type: String, required: true, trim: true },
    /** E.164 number for tel: links, worked out from phone (see toTel). */
    tel: { type: String, required: true },
    address: { type: String, default: '', trim: true },
  },
  { timestamps: true },
);
export type DealerDoc = InferSchemaType<typeof dealerSchema> & { _id: mongoose.Types.ObjectId };
export const DealerModel = mongoose.model('Dealer', dealerSchema);

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    /** Set for a generated password: the user must choose their own before doing anything else. */
    mustChangePassword: { type: Boolean, default: false },
    /** Tokens issued before this moment no longer work. */
    passwordChangedAt: { type: Date },
  },
  { timestamps: true },
);
export type UserDoc = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };
export const UserModel = mongoose.model('User', userSchema);
