const express = require('express');
const fetch = require('node-fetch'); // Run: npm install node-fetch@2
const app = express();

// CORS middleware - allows your HTML page to call the server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Endpoint that calls Facebook API (NEW)
app.get('/facebook-data', async (req, res) => {
    // IMPORTANT: Replace with your own token! Don't share this token!
    const accessToken = "EAAUjd5YjqKgBRm7Li76hG1BWMqVnkUFEGwDO3iXARKPTnFyiuGU8GvHVkpZBmU6gVK5iL4OmCZBdfpVquuZB3UmZBZBf19T02YD6F69az4WgMl2TlArnPSlJh6yhK9Xw5PSv7AWEONuhjge1r8B9UizVJLOMWP6ZC5nhWNbIeDePHuT3XFQTTaHzZAhoYpOVJkwTRbtAqNUbZB795xCF6oDRfZBG5eVYT7FLgPhbw9gziiwZDZD";
    
    console.log("📡 Proxying request to Facebook API...");
    
    try {
        const fbResponse = await fetch(`https://graph.facebook.com/v25.0/105210808833197/feed?access_token=${accessToken}&limit=3`);
        const fbData = await fbResponse.json();
        
        console.log("✅ Facebook API response received");
        
        // Send Facebook's response back to your frontend
        res.json({
            source: "Facebook Graph API",
            timestamp: new Date().toISOString(),
            data: fbData
        });
    } catch (error) {
        console.error("❌ Error calling Facebook:", error);
        res.status(500).json({
            error: "Failed to fetch from Facebook API",
            details: error.message
        });
    }
});

// Original test endpoint (kept for compatibility)
app.get('/data', (req, res) => {
    console.log("📊 Test endpoint called");
    res.json({
        message: 'Hello from the server!',
        timestamp: new Date().toISOString(),
        status: 'Server is running'
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Test endpoint: http://localhost:${PORT}/data`);
    console.log(`📱 Facebook proxy: http://localhost:${PORT}/facebook-data`);
});