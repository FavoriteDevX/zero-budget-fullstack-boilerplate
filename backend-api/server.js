const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 8080;

// Production security hardening
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || '*' }));
app.use(express.json());

// Free-tier protection: Rate limiting to avoid API abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
);

// Health Check Endpoint for Fly.io
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Secure API Route syncing with Supabase free-tier database
app.get('/api/v1/data', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('analytics_cache')
      .select('*')
      .limit(10);

    if (error) throw error;
    res.status(200).json({ success: true, telemetry: data });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server executing securely on port ${PORT}`);
});
