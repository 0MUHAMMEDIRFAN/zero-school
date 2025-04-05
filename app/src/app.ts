import express, { NextFunction, Request, Response } from "express";
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import studentRoutes from './routes/studentRoutes';
import roleRoutes from './routes/roleRoutes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello")
})

// Middleware to log incoming requests to the console.
app.use((req: Request, res: Response, next: NextFunction) => {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`[${new Date().toISOString()}] [${ipAddress}] ${req.method} ${req.url}`);
    next();
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', studentRoutes);
app.use('/api', roleRoutes);

export default app;