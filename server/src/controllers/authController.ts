import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
<<<<<<< Updated upstream
import { PrismaClient } from '../generated/prisma/client.js'; // Import Prisma Client

// Create an instance of the Prisma Client to interact with your database
const prisma = new PrismaClient();

// Helper function to generate a JWT
const generateToken = (uuid: string) => {
  // Ensure you have JWT_SECRET in your .env file!
  return jwt.sign({ id: uuid }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
=======
import { PrismaClient } from '../generated/client';

const prisma = new PrismaClient();

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '90d',
>>>>>>> Stashed changes
  });
};

export const signup = async (req: Request, res: Response) => {
<<<<<<< Updated upstream
  const { name, email, password, role, domain } = req.body;

  // Basic validation
  if (!name || !email || !password || !role || !domain) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password for security
    const passwordHash = await bcrypt.hash(password, 12);

    // Create a simple profile slug from the user's name
    const profileSlug = name.toLowerCase().replace(/\s+/g, '-') + `-${Date.now()}`;

=======
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

>>>>>>> Stashed changes
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
<<<<<<< Updated upstream
        password: passwordHash,
        role,
        domain,
        profileSlug,
      },
    });

    // Generate a token for the new user
    const token = generateToken(newUser.uuid);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { uuid: newUser.uuid, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
=======
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
>>>>>>> Stashed changes
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
<<<<<<< Updated upstream

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token for the logged-in user
    const token = generateToken(user.uuid);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { uuid: user.uuid, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const logout = async (req: Request, res: Response) => {
  // With JWT, logout is typically handled on the client-side by deleting the token.
  res.status(200).json({ message: 'Logout successful' });
=======

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
>>>>>>> Stashed changes
};