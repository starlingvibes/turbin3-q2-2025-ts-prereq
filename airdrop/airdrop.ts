import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

// We're also going to import our wallet and recreate the Keypair object
// using its private key:
// We're going to import our keypair from the wallet file 
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
// Now we're
// going to establish a connection to the Solana devnet: //Create a
// Solana devnet connection to devnet SOL tokens 

const connection =
    new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        // We're going to claim 2 devnet SOL tokens
        const txhash = await
            connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(`Success! Check out your TX here:
https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

// Success! Check out your TX here:
// https://explorer.solana.com/tx/BoQaYXuy3HP1YSEkitB3Dq8q5q2Nt7bP22Y1uCY6ZxL5aZEzNoNen6L7Lo5JufXUbcxKi7YagmbXVm3abEuD56G?cluster=devnet