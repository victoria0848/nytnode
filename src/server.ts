// src/server.ts
import express from 'express'
import dotenv from 'dotenv'
import { authRoutes } from './routes/authRoutes'

dotenv.config()

const app = express()

app.use(express.json())

// brug routes
app.use('/api', authRoutes)

// start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
