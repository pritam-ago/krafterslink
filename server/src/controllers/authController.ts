import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/client';

const prisma = new PrismaClient();

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '90d',
  });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, username, password, domain } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: 'Please provide name, email, username, and password.' });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email or username already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: passwordHash,
        domain,
      },
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      message: 'Signup successful! Your account is pending admin approval.',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (user.approvalStatus === 'PENDING') {
      return res.status(403).json({ message: 'Your account is still pending admin approval.' });
    }

    if (user.approvalStatus === 'REJECTED') {
      return res.status(403).json({ message: 'Your account has been rejected by an administrator.' });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};
