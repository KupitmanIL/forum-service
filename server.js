import express from 'express';
import forumRoutes from './routes/forumRoutes.js';

dotenv.config();

const port = process.env.PORT || 9000;

const app = express();

app.use(express.json());

app.use(forumRoutes);

app.use(req ,res) => res.status(404).type('text/plain; charset=utf-8').send('Not found')

app.listen(port, () => console.log(`Server running on port ${port}. Press Ctrl+C to stop.`));