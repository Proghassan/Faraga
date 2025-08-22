const express = require('express');
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');
const app = express();

// Serve static or basic route (optional)
app.get('/', (req, res) => {
  res.send('WebSocket Server is running');
});

// لا تستخدم شهادة SSL يدوياً في Render، لأنه يضيفها تلقائياً

const server = https.createServer(app); // في Render سيستخدم HTTPS تلقائيًا
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected via wss');
  ws.send('Welcome over secure WebSocket');

  ws.on('message', (msg) => {
    console.log('Received:', msg);
  });
});

// الاستماع على المنفذ الذي توفره Render
const PORT = process.env.PORT || 443;
server.listen(PORT, () => {
  console.log(`Secure WebSocket server running on port ${PORT}`);
});
