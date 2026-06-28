import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const router = Router();

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.get('/teams', async (req, res) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.post('/teams', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

router.get('/activities', async (req, res) => {
  const activities = await Activity.find().populate('user');
  res.json(activities);
});

router.post('/activities', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

router.get('/workouts', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/workouts', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

router.get('/leaderboard', async (req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).populate('user');
  res.json(leaderboard);
});

router.post('/leaderboard', async (req, res) => {
  const entry = new LeaderboardEntry(req.body);
  await entry.save();
  res.status(201).json(entry);
});

export default router;
