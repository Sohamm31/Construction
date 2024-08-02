import jwt from 'jsonwebtoken';
import 'dotenv/config';
const JWT = process.env.JWT_SECRET_KEY
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, JWT);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

export default auth;
