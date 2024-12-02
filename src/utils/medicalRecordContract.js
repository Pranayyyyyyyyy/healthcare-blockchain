import { ethers } from 'ethers';

// Contract ABI
const contractABI = [
  "function addRecord(address patient, string memory recordHash) external",
  "function grantAccess(address viewer) external",
  "function revokeAccess(address viewer) external",
  "function getRecords(address patient) external view returns (tuple(string recordHash, uint256 timestamp, address hospital, bool exists)[])",
  "function addHospital(address hospital) external",
  "function removeHospital(address hospital) external",
  "event RecordAdded(address indexed patient, address indexed hospital, uint256 timestamp)",
  "event AccessGranted(address indexed patient, address indexed viewer)",
  "event AccessRevoked(address indexed patient, address indexed viewer)"
];

export class MedicalRecordContract {
    constructor(contractAddress, provider) {
        this.contractAddress = contractAddress;
        this.contract = new ethers.Contract(
            contractAddress,
            contractABI,
            provider
        );
    }

    async addRecord(patient, recordHash, signer) {
        const contract = this.contract.connect(signer);
        const tx = await contract.addRecord(patient, recordHash);
        return await tx.wait();
    }

    async grantAccess(viewer, signer) {
        const contract = this.contract.connect(signer);
        const tx = await contract.grantAccess(viewer);
        return await tx.wait();
    }

    async revokeAccess(viewer, signer) {
        const contract = this.contract.connect(signer);
        const tx = await contract.revokeAccess(viewer);
        return await tx.wait();
    }

    async getRecords(patient, signer) {
        const contract = this.contract.connect(signer);
        return await contract.getRecords(patient);
    }

    async addHospital(hospital, signer) {
        const contract = this.contract.connect(signer);
        const tx = await contract.addHospital(hospital);
        return await tx.wait();
    }

    async removeHospital(hospital, signer) {
        const contract = this.contract.connect(signer);
        const tx = await contract.removeHospital(hospital);
        return await tx.wait();
    }
}
