import forumRoutes from './routes/forumRoutes.js';

app.use(express.json());
app.use(forumRoutes);