import * as crypto from 'crypto';

const originPrivateKey = 'KIDNINE-1409-ECOMMERCE-PROJECT';
const salt = 'KIDNINE-PROJECT';
const key = crypto.scryptSync(originPrivateKey, salt, 32);
console.log(key.toString('hex'));
