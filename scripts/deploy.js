import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load environment variables
dotenv.config();

async function main() {
  // Connect to Avalanche Fuji testnet
  const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Get contract artifacts
  const MedicalRecordArtifact = require('../src/artifacts/contracts/MedicalRecord.sol/MedicalRecord.json');

  // Deploy contract
  const MedicalRecord = new ethers.ContractFactory(
    MedicalRecordArtifact.abi,
    MedicalRecordArtifact.bytecode,
    wallet
  );

  console.log('Deploying MedicalRecord contract...');
  const medicalRecord = await MedicalRecord.deploy();
  await medicalRecord.deployed();

  console.log('MedicalRecord deployed to:', medicalRecord.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });