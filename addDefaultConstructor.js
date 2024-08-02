import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Constructor from './models/constructor.js';

const URI = process.env.MONGO_URI  // Ensure this is correct

export async function addDefaultConstructor() {
  try {
    // Ensure mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(URI);
    }

    const existingConstructor = await Constructor.findOne({ username: 'defaultConstructor' });
    if (existingConstructor) {
      console.log('Default constructor already exists.');
      return;
    }

    const password = 'defaultPassword';
    const hashedPassword = await bcrypt.hash(password, 10);

    const newConstructor = new Constructor({
      username: 'defaultConstructor',
      password: hashedPassword,
    });

    await newConstructor.save();
    console.log('Default constructor added successfully');
  } catch (error) {
    console.error('Error adding default constructor:', error);
  }
}
export default addDefaultConstructor