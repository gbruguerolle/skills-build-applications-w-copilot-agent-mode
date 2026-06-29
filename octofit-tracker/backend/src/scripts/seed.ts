import { connectToDatabase, disconnectFromDatabase } from '../database';
import { ActivityModel } from '../models/activity.model';
import { LeaderboardModel } from '../models/leaderboard.model';
import { TeamModel } from '../models/team.model';
import { UserModel } from '../models/user.model';
import { WorkoutModel } from '../models/workout.model';

const seed = async () => {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    { name: 'Maya Laurent', email: 'maya.laurent@example.com', age: 29, fitnessLevel: 'advanced' },
    { name: 'Theo Bernard', email: 'theo.bernard@example.com', age: 34, fitnessLevel: 'intermediate' },
    { name: 'Ines Martin', email: 'ines.martin@example.com', age: 26, fitnessLevel: 'beginner' },
    { name: 'Lucas Petit', email: 'lucas.petit@example.com', age: 31, fitnessLevel: 'intermediate' },
    { name: 'Chloe Girard', email: 'chloe.girard@example.com', age: 28, fitnessLevel: 'advanced' },
  ]);

  await TeamModel.insertMany([
    {
      name: 'Pulse Pirates',
      city: 'Lyon',
      motto: 'Steady pace, strong finish.',
      memberUserIds: [users[0]._id, users[1]._id, users[2]._id],
    },
    {
      name: 'Cardio Crew',
      city: 'Paris',
      motto: 'Every rep counts.',
      memberUserIds: [users[3]._id, users[4]._id],
    },
  ]);

  const now = Date.now();
  await ActivityModel.insertMany([
    { userId: users[0]._id, type: 'run', durationMinutes: 48, caloriesBurned: 510, happenedAt: new Date(now - 86400000) },
    { userId: users[1]._id, type: 'bike', durationMinutes: 62, caloriesBurned: 640, happenedAt: new Date(now - 2 * 86400000) },
    { userId: users[2]._id, type: 'yoga', durationMinutes: 40, caloriesBurned: 190, happenedAt: new Date(now - 3 * 86400000) },
    { userId: users[3]._id, type: 'strength', durationMinutes: 55, caloriesBurned: 430, happenedAt: new Date(now - 4 * 86400000) },
    { userId: users[4]._id, type: 'swim', durationMinutes: 45, caloriesBurned: 470, happenedAt: new Date(now - 5 * 86400000) },
  ]);

  await LeaderboardModel.insertMany([
    { userId: users[0]._id, totalPoints: 985, rank: 1, period: 'weekly' },
    { userId: users[4]._id, totalPoints: 920, rank: 2, period: 'weekly' },
    { userId: users[1]._id, totalPoints: 870, rank: 3, period: 'weekly' },
    { userId: users[3]._id, totalPoints: 810, rank: 4, period: 'weekly' },
    { userId: users[2]._id, totalPoints: 720, rank: 5, period: 'weekly' },
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Morning Mobility Flow',
      difficulty: 'beginner',
      durationMinutes: 20,
      targetMuscleGroup: 'full body',
      equipmentNeeded: ['yoga mat'],
    },
    {
      title: 'Core Burner Circuit',
      difficulty: 'intermediate',
      durationMinutes: 30,
      targetMuscleGroup: 'core',
      equipmentNeeded: ['kettlebell', 'yoga mat'],
    },
    {
      title: 'Tempo Run Builder',
      difficulty: 'advanced',
      durationMinutes: 45,
      targetMuscleGroup: 'legs',
      equipmentNeeded: ['running shoes'],
    },
    {
      title: 'Upper Body Strength Ladder',
      difficulty: 'intermediate',
      durationMinutes: 35,
      targetMuscleGroup: 'upper body',
      equipmentNeeded: ['dumbbells', 'bench'],
    },
    {
      title: 'Swim Endurance Blocks',
      difficulty: 'advanced',
      durationMinutes: 50,
      targetMuscleGroup: 'full body',
      equipmentNeeded: ['pool', 'kickboard'],
    },
  ]);

  console.log('Seeding complete: users, teams, activities, leaderboard, workouts');
  await disconnectFromDatabase();
};

seed().catch(async (error: unknown) => {
  console.error('Seeding failed:', error);
  await disconnectFromDatabase();
  process.exit(1);
});
