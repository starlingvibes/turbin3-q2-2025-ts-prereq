import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
// import * as prompt from 'prompt-sync';

//Generate a new keypair
let kp = Keypair.generate()
console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`)
console.log(`[${kp.secretKey}]`)

// Convert from byte array to base58 encoded private key
let secretKey = bs58.encode(kp.secretKey);
console.log(`Base58 encoded private key: ${secretKey}`)
console.log(`[${kp.secretKey}]`)
console.log(`[${kp.secretKey.toString()}]`)