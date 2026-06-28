import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  joinedAt: { type: Date, default: () => new Date() }
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
});

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, default: 0 },
  date: { type: Date, default: () => new Date() }
});

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  durationMinutes: { type: Number, required: true }
});

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, required: true },
  rank: { type: Number, required: true }
});

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const Workout = model('Workout', workoutSchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
