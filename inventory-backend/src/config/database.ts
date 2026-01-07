import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      autoIndex: true,
    });

    console.log(`MongoDB Connected successfully`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
