import { Response, NextFunction } from 'express'
import { AuthRequest } from './authenticateToken'

// Funktionen kan kaldes med en eller flere roller som parameter
export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user

    // Hvis authenticateToken ikke har sat user → ikke logget ind
    if (!user) {
      return res.status(401).json({ message: 'You are not logged in' })
    }

    // Hvis ingen roller er krævet → giv adgang
    if (allowedRoles.length === 0) {
      return next()
    }

    // Tjek om brugerens role er en af de tilladte
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'You dont have permissions to access the url' })
    }

    // Alt OK
    return next()
  }
}