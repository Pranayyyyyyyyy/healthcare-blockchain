import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Full Contract ABI
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "hospital",
                "type": "address"
            }
        ],
        "name": "HospitalRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "aadharNumber",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "recordHash",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "hospital",
                "type": "address"
            }
        ],
        "name": "RecordAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_aadharNumber",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "_recordHash",
                "type": "bytes32"
            }
        ],
        "name": "addRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_aadharNumber",
                "type": "string"
            }
        ],
        "name": "getRecords",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes32",
                        "name": "recordHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "address",
                        "name": "hospital",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct MedicalRecord.Record[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_hospital",
                "type": "address"
            }
        ],
        "name": "registerHospital",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "registeredHospitals",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function main() {
    try {
        // Connect to Avalanche Fuji testnet
        const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
        
        // Create wallet from private key
        const privateKey = process.env.PRIVATE_KEY;
        const wallet = new ethers.Wallet(privateKey, provider);
        
        // Contract address
        const contractAddress = process.env.VITE_CONTRACT_ADDRESS;
        
        // Create contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);
        
        // Get the hospital address from command line
        const hospitalAddress = process.argv[2];
        if (!hospitalAddress) {
            throw new Error("Please provide the hospital address as an argument");
        }

        console.log("Connected wallet address:", wallet.address);
        console.log("Checking if wallet is contract owner...");

        // Check if hospital is already registered
        console.log("Checking if hospital is already registered...");
        const isRegistered = await contract.registeredHospitals(hospitalAddress);
        console.log("Is registered:", isRegistered);
        
        if (isRegistered) {
            console.log(`Hospital ${hospitalAddress} is already registered`);
            return;
        }

        // Register hospital
        console.log(`Registering hospital ${hospitalAddress}...`);
        const tx = await contract.registerHospital(hospitalAddress, {
            gasLimit: 200000 // Set a specific gas limit
        });
        console.log("Transaction hash:", tx.hash);
        
        // Wait for confirmation
        console.log("Waiting for confirmation...");
        const receipt = await tx.wait();
        console.log("Transaction confirmed in block:", receipt.blockNumber);
        console.log("Hospital successfully registered!");
        
        // Verify registration
        console.log("Verifying registration...");
        const isNowRegistered = await contract.registeredHospitals(hospitalAddress);
        console.log("Is now registered:", isNowRegistered);
        
    } catch (error) {
        console.error("Error:", error.message);
        if (error.error) {
            console.error("Error details:", error.error);
        }
        if (error.transaction) {
            console.error("Transaction:", error.transaction);
        }
    }
}

main();
