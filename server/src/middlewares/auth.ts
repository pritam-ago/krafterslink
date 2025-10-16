import { Request, Response, NextFunction } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - provide x-user-id header in dev' });
  }
  (req as any).user = { id: userId };
  next();
};

export default requireAuth;
