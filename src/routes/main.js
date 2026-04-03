import express from 'express';
import auth from './auth.js';

const app = express();


app.use(express.json());

app.get('/health',(req,res)=>{
    res.status(200).json({message:`All Good!,Services running well`,
        timeStamp: new Date().toLocaleDateString()
    })
})

app.use('/auth',auth)



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode||500
    const ErrorDetails={
        message:`${err.message}`||`Something went wrong`,
        timeStamp:new Date().toLocaleString(),
        code:err.internalCode||err.message
    }
    res.status(statusCode).json(ErrorDetails)
})

export default app;
