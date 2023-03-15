import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Db connected');
  } catch (error) {
    throw new Error('DB could not connect');
  }
};

export default dbConnect;
