import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createLink = async (req: Request, res: Response) => {
  try {
    const { userId, platform, url, displayName } = req.body;
    if (!userId || !platform || !url) {
      return res.status(400).json({ error: 'userId, platform and url are required' });
    }
    const newLink = await prisma.socialLink.create({
      data: {
        userId,
        platform,
        url,
        displayName: displayName ?? null,
      },
    });
    res.status(201).json(newLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create link' });
  }
};

export const listLinks = async (req: Request, res: Response) => {
  try {
    const links = await prisma.socialLink.findMany();
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to list links' });
  }
};

export const getLink = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const link = await prisma.socialLink.findUnique({ where: { id } });
    if (!link) return res.status(404).json({ error: 'Link not found' });
    res.status(200).json(link);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get link' });
  }
};

export const updateLink = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { platform, url, displayName } = req.body;
    const updated = await prisma.socialLink.update({
      where: { id },
      data: { platform, url, displayName },
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update link' });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.socialLink.delete({ where: { id } });
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete link' });
  }
};
