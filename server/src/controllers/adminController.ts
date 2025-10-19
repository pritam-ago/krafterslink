import { Request, Response } from 'express';
import { PrismaClient, ApprovalStatus } from '../generated/client';

const prisma = new PrismaClient();

export const getPendingUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { approvalStatus: 'PENDING' },
      select: { id: true, name: true, email: true, username: true, createdAt: true },
    });
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending users.' });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['APPROVED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status provided. Use "APPROVED" or "REJECTED".' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { approvalStatus: status as ApprovalStatus },
    });

    res.status(200).json({
      message: `User ${updatedUser.name} has been ${status.toLowerCase()}.`,
    });
  } catch (error) {
    res.status(404).json({ message: 'User not found.' });
  }
};