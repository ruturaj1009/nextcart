// const express = require("express");
// const colors = require("colors");
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>Helloo And Welcome to rutu</h1>");
})

const PORT = process.env.PORT || 8080 ;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.bgCyan.bold.white);
})