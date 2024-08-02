import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Constructor from '../models/constructor.js';
import Owner from '../models/owner.js';
import 'dotenv/config'

const router = express.Router();
const JWT = process.env.JWT_SECRET_KEY

// Constructor login
router.post('/constructor/login', async (req, res) => {
  const { username, password } = req.body;
  const constructor = await Constructor.findOne({ username });
  if (!constructor) return res.status(400).send('Constructor not found');

  const isMatch = await bcrypt.compare(password, constructor.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: constructor._id }, JWT);
  res.json({ token });
});

// Owner login
router.post('/owner/login', async (req, res) => {
  const { username, password } = req.body;
  const owner = await Owner.findOne({ username });
  if (!owner) return res.status(400).send('Owner not found');

  const isMatch = await bcrypt.compare(password, owner.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: owner._id }, JWT);
  res.json({ token });
});

export default router;
