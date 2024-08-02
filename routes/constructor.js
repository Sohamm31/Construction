import express from 'express';
import bcrypt from 'bcryptjs';
import Owner from '../models/owner.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Add new owner
router.post('/add-owner', auth, async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newOwner = new Owner({ username, password: hashedPassword });

  await newOwner.save();
  res.status(201).send('Owner added successfully');
});

export default router;
