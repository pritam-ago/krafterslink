import { Request, Response } from 'express';

export const createLink = async (req: Request, res: Response) => {
  res.status(201).json({ message: 'create link (placeholder)' });
};

export const listLinks = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'list links (placeholder)', data: [] });
};

export const getLink = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'get link (placeholder)', id: req.params.id });
};

export const deleteLink = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'delete link (placeholder)', id: req.params.id });
};
