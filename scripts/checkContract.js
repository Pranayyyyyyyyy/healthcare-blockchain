import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
    try {
        // Connect to Avalanche Fuji testnet
        const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
        
        // Contract address
        const contractAddress = process.env.VITE_CONTRACT_ADDRESS;
        console.log("Checking contract at address:", contractAddress);
        
        // Get contract code
        const code = await provider.getCode(contractAddress);
        console.log("Contract code length:", code.length);
        console.log("Is contract deployed:", code !== "0x");
        
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
