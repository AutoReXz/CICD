const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
// Hardcoding the backend API URL to the specified Cloud Run service
const API_URL = 'https://notes-app-263444552508.us-central1.run.app/api';

// Setup EJS template engine
app.set('view engine', 'ejs');

// Add CORS headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Proxy API requests to the backend
app.use('/api', createProxyMiddleware({
  target: 'https://notes-app-263444552508.us-central1.run.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api', // This keeps the /api prefix
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error occurred');
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('Proxy response status:', proxyRes.statusCode);
  }
}));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Send index.html for any non-API route and pass the hardcoded API URL to it
app.get('*', (req, res) => {
  res.render(path.join(__dirname, 'index.html'), {
    process: {
      env: {
        API_URL: 'https://notes-app-263444552508.us-central1.run.app/api' // Using the hardcoded API URL
      }
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API proxy configured to: https://notes-app-263444552508.us-central1.run.app/api`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
