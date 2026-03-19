require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// In-memory users (use a DB in production). Passwords hashed with bcrypt.
const users = [
  { id: '1', email: 'tenant@test.com', passwordHash: '$2a$10$rQnM1.wJZ5K5Z5Z5Z5Z5ZuO8vY5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5O', role: 'tenant' },
  { id: '2', email: 'landlord@test.com', passwordHash: '$2a$10$rQnM1.wJZ5K5Z5Z5Z5Z5ZuO8vY5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5O', role: 'landlord' },
];
const demoHash = bcrypt.hashSync('password123', 10);
users[0].passwordHash = demoHash;
users[1].passwordHash = demoHash;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role))
      return res.status(403).json({ error: 'Insufficient permissions for this role.' });
    next();
  };
}

// POST /api/auth/login — returns JWT with user id, email, role
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required.' });
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ error: 'Invalid email or password.' });
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

// GET /api/auth/me — verify token and return current user (for frontend session restore)
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: { id: req.user.userId, email: req.user.email, role: req.user.role } });
});

// Example protected route: tenant-only
app.get('/api/tenant/dashboard', authMiddleware, requireRole('tenant'), (req, res) => {
  res.json({ message: 'Tenant data', userId: req.user.userId });
});

// Example protected route: landlord-only
app.get('/api/landlord/dashboard', authMiddleware, requireRole('landlord'), (req, res) => {
  res.json({ message: 'Landlord data', userId: req.user.userId });
});

app.listen(PORT, () => console.log(`Auth API running on http://localhost:${PORT}`));
