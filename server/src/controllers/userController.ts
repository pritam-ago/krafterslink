import { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response) => {
  const user = (req as any).user || { id: 'anonymous' };
  res.status(200).json({ message: 'get profile (placeholder)', user });
};

export const updateProfile = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'update profile (placeholder)', updates: req.body });
};
