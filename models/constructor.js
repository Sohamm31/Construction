import mongoose from 'mongoose';

const { Schema } = mongoose;

const ConstructorSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('Constructor', ConstructorSchema);
