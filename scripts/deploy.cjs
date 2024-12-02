const hre = require("hardhat");

async function main() {
  console.log("Deploying Medical Record contract...");

  // Get the contract factory
  const MedicalRecord = await hre.ethers.getContractFactory("MedicalRecord");

  // Deploy the contract
  const medicalRecord = await MedicalRecord.deploy();
  await medicalRecord.deployed();

  console.log("MedicalRecord deployed to:", medicalRecord.address);
  console.log("Transaction hash:", medicalRecord.deployTransaction.hash);
  
  // Wait for few block confirmations
  console.log("Waiting for block confirmations...");
  await medicalRecord.deployTransaction.wait(6); // wait for 6 block confirmations
  
  console.log("Contract deployment completed!");
  console.log("Contract address:", medicalRecord.address);
  console.log("View on Snowtrace:", `https://testnet.snowtrace.io/address/${medicalRecord.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
