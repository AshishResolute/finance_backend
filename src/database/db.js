import {Pool} from 'pg';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import path from 'path';


const currentFilePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(currentFilePath);

dotenv.config({path:path.join(__dirname,'../../dev.env')})

const pool = new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD
});


pool.query('select now()',(err,res)=>{
    if(err) return console.log(`database connection failed!,${err}`)
        console.log(`database successfully connected at ${res.rows[0].now}`)
});


export default pool;