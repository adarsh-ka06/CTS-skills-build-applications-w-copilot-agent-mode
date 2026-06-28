import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

// Seed the octofit_db database with test data
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

const users = [
  { name: 'Ariana Green', email: 'ariana.green@example.com' },
  { name: 'Marcus Lee', email: 'marcus.lee@example.com' },
  { name: 'Jasmine Patel', email: 'jasmine.patel@example.com' }
];

const workouts = [
  { title: 'Full Body Strength', description: 'A balanced strength routine for all major muscle groups.', difficulty: 'medium', durationMinutes: 40 },
  { title: 'Morning Yoga Flow', description: 'A calming yoga sequence to start the day.', difficulty: 'easy', durationMinutes: 30 },
  { title: 'Cardio Blast', description: 'High-intensity interval training to boost endurance.', difficulty: 'hard', durationMinutes: 25 }
];

const seed = async () => {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);
  console.log(`Connected to MongoDB at ${mongoUri}`);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const createdUsers = await User.insertMany(users);
  const createdWorkouts = await Workout.insertMany(workouts);

  const teams = [
    { name: 'Team Voyager', members: [createdUsers[0]._id, createdUsers[1]._id] },
    { name: 'Team Zenith', members: [createdUsers[1]._id, createdUsers[2]._id] }
  ];

  const createdTeams = await Team.insertMany(teams);

  const activities = [
    { user: createdUsers[0]._id, type: 'run', durationMinutes: 35, caloriesBurned: 320, date: new Date('2026-06-20') },
    { user: createdUsers[1]._id, type: 'strength', durationMinutes: 45, caloriesBurned: 410, date: new Date('2026-06-19') },
    { user: createdUsers[2]._id, type: 'yoga', durationMinutes: 30, caloriesBurned: 150, date: new Date('2026-06-21') }
  ];

  const createdActivities = await Activity.insertMany(activities);

  const leaderboard = [
    { user: createdUsers[1]._id, score: 950, rank: 1 },
    { user: createdUsers[0]._id, score: 870, rank: 2 },
    { user: createdUsers[2]._id, score: 780, rank: 3 }
  ];

  const createdLeaderboard = await LeaderboardEntry.insertMany(leaderboard);

  console.log('Inserted data:');
  console.log(`- users: ${createdUsers.length}`);
  console.log(`- workouts: ${createdWorkouts.length}`);
  console.log(`- teams: ${createdTeams.length}`);
  console.log(`- activities: ${createdActivities.length}`);
  console.log(`- leaderboard entries: ${createdLeaderboard.length}`);

  await mongoose.disconnect();
  console.log('Seed complete');
};

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});