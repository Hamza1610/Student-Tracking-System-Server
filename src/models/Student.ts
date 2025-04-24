import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  email: string;
  location: {
    latitude: number;
    longitude: number;
  };
  parent: mongoose.Types.ObjectId;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent', required: true },
});

export default mongoose.model<IStudent>('Student', StudentSchema);