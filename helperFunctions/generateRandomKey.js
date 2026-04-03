import crypto from 'crypto';

let generateRandomString = ()=>{
    console.log(crypto.randomBytes(16).toString('hex'))
}

generateRandomString()