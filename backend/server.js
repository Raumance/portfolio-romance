const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('MONGO_URI et JWT_SECRET doivent être définis dans backend/.env');
  process.exit(1);
}

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

const allowedOrigins = [
  'http://localhost:4200',
  'https://portfolio-romance.vercel.app',
  ...(process.env.FRONTEND_URL || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    const normalized = origin.replace(/\/$/, '');
    const isAllowed =
      allowedOrigins.includes(normalized) ||
      /^https:\/\/portfolio-romance[a-z0-9-]*\.vercel\.app$/.test(normalized);
    return callback(null, isAllowed);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skip: () => process.env.NODE_ENV === 'development',
  skipSuccessfulRequests: true,
  message: { message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' }
});

app.use('/api', apiLimiter);
app.use(express.json({ limit: '10kb' }));
app.use((req, _res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body);
  }
  if (req.params) {
    mongoSanitize.sanitize(req.params);
  }
  next();
});
app.use(hpp());

app.get('/', (req, res) => {
  res.send('API Portfolio en ligne...');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

app.use('/api/auth', authLimiter, require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/experiences', require('./routes/experienceRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

app.use((req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas." });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré en mode ${process.env.NODE_ENV || 'développement'} sur le port ${PORT}`);
});

connectDB();
