import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import pool from './utils/db.js';
import authRoutes from './routes/auth.js';
import linksRoutes from './routes/links.js';
import usersRoutes from './routes/users.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

 pool.connect()
   .then((client: any) => {
     client.release();
     console.log('DB reachable');
   })
   .catch((err: any) => console.error('DB Connection Error:', err));

app.get('/health', (req, res) => res.send('Server is healthy'));

app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes);
app.use('/api/users', usersRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
