import http from "http";
import fs from "fs";
import users from "./Routes/user.mjs";
import payments from "./Routes/payment.mjs";  // Payment request routes
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from 'express-session';
import hpp from "hpp";

const PORT = 3000;
const app = express();

// SSL Certificates for HTTPS
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
};

// Middleware for security headers
app.use(helmet());

// Simplified CORS settings
app.use(cors({
  origin: "http://localhost:3001",  // Allow requests from your frontend at this address
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware for parsing JSON request bodies
app.use(express.json());

// Rate limiting to prevent DDoS attacks
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// HTTP Parameter Pollution protection
app.use(hpp());

// Secure session management
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true, maxAge: 60000 }  // Secure, HTTP only, with expiry
}));

// Routes for users and payments
app.use("/user", users);
app.use("/payment", payments);  // Payment request routes

// HTTPS Server Setup
let server = http.createServer(app);  
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
