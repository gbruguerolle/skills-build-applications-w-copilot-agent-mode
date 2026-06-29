import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { ActivityModel } from './models/activity.model';
import { LeaderboardModel } from './models/leaderboard.model';
import { TeamModel } from './models/team.model';
import { UserModel } from './models/user.model';
import { WorkoutModel } from './models/workout.model';

dotenv.config();

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', baseUrl });
});

app.get('/api/users/', (_req, res) => {
  UserModel.find()
    .sort({ createdAt: -1 })
    .lean()
    .then((items) => {
      res.status(200).json({ resource: 'users', count: items.length, items });
    })
    .catch((error: unknown) => {
      res.status(500).json({ message: 'Failed to fetch users', error });
    });
});

app.get('/api/teams/', (_req, res) => {
  TeamModel.find()
    .populate('memberUserIds', 'name email fitnessLevel')
    .sort({ createdAt: -1 })
    .lean()
    .then((items) => {
      res.status(200).json({ resource: 'teams', count: items.length, items });
    })
    .catch((error: unknown) => {
      res.status(500).json({ message: 'Failed to fetch teams', error });
    });
});

app.get('/api/activities/', (_req, res) => {
  ActivityModel.find()
    .populate('userId', 'name email')
    .sort({ happenedAt: -1 })
    .lean()
    .then((items) => {
      res.status(200).json({ resource: 'activities', count: items.length, items });
    })
    .catch((error: unknown) => {
      res.status(500).json({ message: 'Failed to fetch activities', error });
    });
});

app.get('/api/leaderboard/', (_req, res) => {
  LeaderboardModel.find()
    .populate('userId', 'name email')
    .sort({ rank: 1 })
    .lean()
    .then((items) => {
      res.status(200).json({ resource: 'leaderboard', count: items.length, items });
    })
    .catch((error: unknown) => {
      res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    });
});

app.get('/api/workouts/', (_req, res) => {
  WorkoutModel.find()
    .sort({ createdAt: -1 })
    .lean()
    .then((items) => {
      res.status(200).json({ resource: 'workouts', count: items.length, items });
    })
    .catch((error: unknown) => {
      res.status(500).json({ message: 'Failed to fetch workouts', error });
    });
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
