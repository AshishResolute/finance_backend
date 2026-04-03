import express from 'express';
import app from '../routes/main.js';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import path from 'path';


const currentFilePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(currentFilePath);

dotenv.config({path:path.join(__dirname,'../../dev.env')})

const PORT = process.env.SERVER_PORT;

app.listen(PORT,()=>{
    console.log(`Server running at PORT: ${PORT}`)
})