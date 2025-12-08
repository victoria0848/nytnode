import express from 'express';
import dotenv from 'dotenv';
import {carRoutes} from './routes/carRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { loginRoutes } from './routes/loginRoutes.js';
// Indlæs miljøvariabler fra .env (uden at vise logs)
dotenv.config({ quiet: true });

// Brug port fra .env eller falde tilbage til 3000
const port = process.env.SERVERPORT || 4000;

// Opret express-app
const app = express();

// Gør det muligt at modtage JSON i requests
app.use(express.json());

// Gør det muligt at modtage form-data (fx fra formularer)
app.use(express.urlencoded({ extended: true }));

// Brug vores user-routes under /api/users
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
// app.use('/api/login', loginRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).json({ error: 'Kunne ikke finde siden du søgte efter' });
});

// Start serveren
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server kører på http://localhost:${PORT}`));

export default app;