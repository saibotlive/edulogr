import mongoose, { Document, Schema } from 'mongoose';

interface IIncident extends Document {
  institution: Schema.Types.ObjectId;
  childName: string;
  details: string;
  date: Date;
  status: string;
  signature: string;
  signatureType: 'handwritten' | 'typed';
  comments: string;
}

const incidentSchema = new Schema<IIncident>({
  institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  childName: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, required: true },
  signature: { type: String, required: true },
  signatureType: { type: String, required: true, enum: ['handwritten', 'typed'] },
  comments: { type: String },
});

const Incident = mongoose.model<IIncident>('Incident', incidentSchema);
export default Incident;
