import dotenv from 'dotenv';
import express from "express";
import userRouter from '../backend/routes/userRoutes.js';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errormiddleware.js';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users',userRouter)

app.get('/',(req,res)=>res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port,  () => console.log(`Server is started at ${port}`))