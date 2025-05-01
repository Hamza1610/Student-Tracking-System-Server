import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  uid: string; // Firebase UID
  name: string;
  email: string;
  role: string; // Role field to store "Student"
  location: {
    latitude: number;
    longitude: number;
  };
  parent: mongoose.Types.ObjectId;
}

const StudentSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "Student" }, // Default role is "Student"
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent'},
});

export default mongoose.model<IStudent>('Student', StudentSchema);