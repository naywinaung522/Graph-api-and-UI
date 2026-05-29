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
    const accessToken = "EAAUjd5YjqKgBRpCOZCoCD37TlvecO8WXUhDpt0vWZAUMwTFJF3ZB0gcG9mzQ9Jh4aPAiL2qxZBCwa0z1uI8fj67GB1xTAZAOiiuTnjkXO0GjUReMFF3ZBHyMQ2YcBZB6pevIY6ZCqKcHQgwZAqdEKSc2R7nuZBnDWd9oULyTSz6yL0PbscMrdAQ5M0wQL6bTBAV51fiRuVxjpuzPdObhNwQF8WNudQZBlO2JjetFkXXwcZAFfYvGIGrTXaZB1WZCsI3UzsYqWSn4ZBX6ZCoWjegc4k3Igre5q3Ocw9TsTVO5V5EZD";
    
    console.log("📡 Proxying request to Facebook API...");
    
    try {
        const fbResponse = await fetch(`https://graph.facebook.com/v25.0/me/accounts?access_token=${accessToken}`);
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