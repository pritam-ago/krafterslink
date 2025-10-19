import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
<<<<<<< Updated upstream
import { PrismaClient, User } from '../generated/prisma/client.js'; // Import types

const prisma = new PrismaClient();

// This is a custom Request type to help TypeScript understand `req.user`
// Since you can't edit global.d.ts, we define it here.
interface AuthenticatedRequest extends Request {
  user?: User;
}

const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
=======
import { PrismaClient, User, Role } from '../generated/client';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
>>>>>>> Stashed changes
  }

  const token = authHeader.split(' ')[1];

  try {
<<<<<<< Updated upstream
    // Verify the token using your JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // Find the user from the database using the UUID from the token
    const user = await prisma.user.findUnique({
      where: { uuid: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }
    
    // IMPORTANT: Remove the password before attaching the user object to the request
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword; // Attach user to the request object

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default requireAuth;
=======
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found.' });
    }

    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};

export const restrictTo = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
    next();
  };
};
>>>>>>> Stashed changes
