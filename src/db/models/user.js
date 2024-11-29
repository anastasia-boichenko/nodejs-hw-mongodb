import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdSettings } from './hooks.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.post('save', handleSaveError);

usersSchema.pre('findOneAndUpdate', setUpdSettings);

usersSchema.post('findOneAndUpdate', handleSaveError);

export const UsersCollection = model('user', usersSchema);
