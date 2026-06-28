import express from 'express';
import routes from './routes.ts';
import { connectDatabase, getDatabaseUri } from './config/database.ts';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const mongoUri = getDatabaseUri();

app.use(express.json());
app.use('/api', routes);

app.get('/api/config', (req, res) => {
  res.json({ apiBaseUrl, port, mongoUri });
});

const start = async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }

  app.listen(port, () => {
    console.log(`Backend listening on ${apiBaseUrl}`);
  });
};

start();
