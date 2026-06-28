import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

app.use(express.json());
app.use('/api', routes);

app.get('/api/config', (req, res) => {
  res.json({ apiBaseUrl, port, mongoUri });
});

const start = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }

  app.listen(port, () => {
    console.log(`Backend listening on ${apiBaseUrl}`);
  });
};

start();
