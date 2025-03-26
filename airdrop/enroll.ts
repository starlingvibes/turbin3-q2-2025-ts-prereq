import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import bs58 from 'bs58';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

if (!process.env.TURBIN3_PRIVATE_KEY) {
    console.error('TURBIN3_PRIVATE_KEY not found in environment variables');
    process.exit(1);
}

const keypair = Keypair.fromSecretKey(bs58.decode(process.env.TURBIN3_PRIVATE_KEY));

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");
// Github account
const github = Buffer.from("starlingvibes", "utf8");
// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
    commitment: "confirmed",
});
// Create our program
const program: Program<Turbin3Prereq> = new Program(IDL, provider);

// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("pre"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
    enrollment_seeds,
    program.programId
);

// Execute our enrollment transaction
(async () => {
    try {
        const txhash = await program.methods
            .submit(github)
            // .update(github)
            // .clean()
            .accounts({
                signer: keypair.publicKey,
                // prereq: enrollment_key,
            })
            .signers([keypair])
            .rpc();
        console.log(`Success! Check out your TX here:
        https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();

// Success! Check out your TX here:
// https://explorer.solana.com/tx/bPQotgDmV5xD81u6icaNPScvCW62HPuRHGd72r9eKKaJkya28W63t7GDC2eABKWJRLTxWm2thS2zNpwrdjyVBY2?cluster=devnet