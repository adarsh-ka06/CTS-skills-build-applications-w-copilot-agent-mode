import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB at ${mongoUri}`);
};

export const getDatabaseUri = () => mongoUri;
