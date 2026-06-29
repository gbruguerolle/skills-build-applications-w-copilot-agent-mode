import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

const start = async () => {
  await mongoose.connect(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`OctoFit backend listening on port ${PORT}`);
  });
};

start().catch((error: unknown) => {
  console.error('Failed to start backend:', error);
  process.exit(1);
});
