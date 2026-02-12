#!/usr/bin/env node
// Lightweight Yahoo Finance CORS proxy for Campo Portfolio
const http = require('http');
const https = require('https');

const PORT = 8854;
const ALLOWED_ORIGINS = ['https://portfolio.campolabs.ai', 'http://localhost:8853'];

const server = http.createServer((req, res) => {
  const origin = req.headers.origin || '';
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const ticker = url.searchParams.get('t');
  const VALID_RANGES = ['1d', '2d', '5d', '1mo', '3mo', '6mo', '1y'];
  const range = VALID_RANGES.includes(url.searchParams.get('range')) ? url.searchParams.get('range') : '2d';
  
  if (!ticker || !/^[A-Za-z0-9.\-^=]+$/.test(ticker)) {
    res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin });
    return res.end(JSON.stringify({ error: 'Invalid ticker' }));
  }

  const yUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=${range}`;
  
  https.get(yUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (yRes) => {
    let body = '';
    yRes.on('data', chunk => body += chunk);
    yRes.on('end', () => {
      res.writeHead(yRes.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': corsOrigin,
        'Cache-Control': 'public, max-age=60'
      });
      res.end(body);
    });
  }).on('error', (e) => {
    res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': corsOrigin });
    res.end(JSON.stringify({ error: e.message }));
  });
});

server.listen(PORT, () => console.log(`Yahoo Finance proxy on :${PORT}`));
