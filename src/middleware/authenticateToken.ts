import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Hemmelig nøgle til at verificere token
const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

// Udvider Express Request så req.user kan bruges i routes
export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Ingen authorization header → ulogget
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No token found (requires Authorization header)" });
  }

  // Bearer TOKEN
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Wrong token-format" });
  }

  try {
    // Dekod token
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;

    // Debug → vis hvad der ligger i tokenen
    console.log("Decoded token:", decoded);

    // Læg brugerinfo på request objektet
    req.user = decoded;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token is expired or invalid" });
  }
};