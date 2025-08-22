const express = require('express');
const app = express();
const http = require('http').createServer(app);;
const fs = require('fs');
const WebSocket = require('ws');


// Serve static or basic route (optional)


// لا تستخدم شهادة SSL يدوياً في Render، لأنه يضيفها تلقائياً

 // في Render سيستخدم HTTPS تلقائيًا
const wss = new WebSocket.Server({ server:http });

app.get('/', (req, res) => {
  res.send('WebSocket Server is running');
});

wss.on('connection', (ws) => {
  console.log('Client connected via wss');
  ws.send('Welcome over secure WebSocket');

  ws.on('message', (msg) => {
    console.log('Received:', msg);
  });
});

// الاستماع على المنفذ الذي توفره Render
const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
  console.log(`Secure WebSocket server running on port ${PORT}`);
});



