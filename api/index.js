import express from 'express'
import assignmentsRouter from './assignments.js';


const app = express();

app.use('/api/v1', assignmentsRouter);

export default app;