import mongoose, { Schema, Document } from 'mongoose';

export interface IParent extends Document {
  name: string;
  email: string;
  students: mongoose.Types.ObjectId[];
}

const ParentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

export default mongoose.model<IParent>('Parent', ParentSchema);