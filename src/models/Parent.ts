import mongoose, { Schema, Document } from 'mongoose';

export interface IParent extends Document {
  uid: string; // Firebase UID
  name: string;
  email: string;
  role: string; // Role field to store "Parent"
  students: mongoose.Types.ObjectId[];
}

const ParentSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "Parent" }, // Default role is "Parent"
  students: [{ type: {}, ref: 'Student' }],
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

export default mongoose.model<IParent>('Parent', ParentSchema);