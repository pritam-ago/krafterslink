import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
  res.status(201).json({ message: 'signup endpoint (placeholder)' });
};

export const login = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'login endpoint (placeholder)' });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'logout endpoint (placeholder)' });
};
