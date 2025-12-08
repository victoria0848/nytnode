import { Router } from 'express'
import { authenticateToken } from '../middleware/authenticateToken'
import { authorizeRole } from '../middleware/authorizeRole'
import { getUserProfile } from '../controllers/authController'

const router = Router()

// /api/auth/authorize
router.get(
  '/authorize',
  authenticateToken,          // Tjekker token
  authorizeRole('USER', 'ADMIN'),  // Kræver USER eller ADMIN
  getUserProfile              // Returnerer profil
)

export { router as authRoutes }