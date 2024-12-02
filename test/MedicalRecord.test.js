const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalRecord", function () {
  let MedicalRecord;
  let medicalRecord;
  let owner;
  let hospital;
  let patient;
  let other;

  beforeEach(async function () {
    [owner, hospital, patient, other] = await ethers.getSigners();

    MedicalRecord = await ethers.getContractFactory("MedicalRecord");
    medicalRecord = await MedicalRecord.deploy();
    await medicalRecord.deployed();

    // Add hospital role
    await medicalRecord.addHospital(hospital.address);
  });

  describe("Record Management", function () {
    const testHash = "0x1234567890abcdef";

    it("Should allow hospital to add record", async function () {
      await expect(
        medicalRecord.connect(hospital).addRecord(patient.address, testHash)
      )
        .to.emit(medicalRecord, "RecordAdded")
        .withArgs(patient.address, hospital.address, await getBlockTimestamp());
    });

    it("Should not allow non-hospital to add record", async function () {
      await expect(
        medicalRecord.connect(other).addRecord(patient.address, testHash)
      ).to.be.revertedWith("Caller is not a hospital");
    });

    it("Should allow patient to view their records", async function () {
      await medicalRecord.connect(hospital).addRecord(patient.address, testHash);
      const records = await medicalRecord.connect(patient).getRecords(patient.address);
      expect(records.length).to.equal(1);
      expect(records[0].recordHash).to.equal(testHash);
    });

    it("Should allow patient to grant and revoke access", async function () {
      await medicalRecord.connect(patient).grantAccess(other.address);
      await expect(
        medicalRecord.connect(patient).revokeAccess(other.address)
      )
        .to.emit(medicalRecord, "AccessRevoked")
        .withArgs(patient.address, other.address);
    });
  });

  async function getBlockTimestamp() {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp;
  }
});
