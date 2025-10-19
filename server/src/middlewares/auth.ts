import { Request, Response, NextFunction } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - provide x-user-id header in dev' });
  }
  (req as any).user = { id: userId };
  next();
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const adminId = req.header('x-admin-id');
  if (!adminId) {
    return res.status(403).json({ error: 'Forbidden - provide x-admin-id header in dev' });
  }
  (req as any).admin = { id: adminId };
  next();
};

export default requireAuth;
