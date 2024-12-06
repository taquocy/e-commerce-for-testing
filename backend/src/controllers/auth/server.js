import express from 'express';
import googleAuthRoutes from './routes/googleAuthRoutes';

const app = express();
app.use(express.json());

app.use('/api', googleAuthRoutes);
app.listen(3000, () => console.log('Server running on port 3000'));
