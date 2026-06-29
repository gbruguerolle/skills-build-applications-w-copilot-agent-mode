import mongoose from 'mongoose';

export const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(MONGO_URI);
};

export const disconnectFromDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};
