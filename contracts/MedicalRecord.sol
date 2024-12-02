// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MedicalRecord {
    struct Record {
        bytes32 recordHash;
        string patientName;
        string patientUID;
        uint256 age;
        string description;
        string prescription;
        string notes;
        address hospital;
        uint256 timestamp;
    }

    // Mapping from Aadhar number to array of records
    mapping(string => Record[]) private records;
    
    // Mapping to track registered hospitals
    mapping(address => bool) public registeredHospitals;
    
    // Contract owner
    address private owner;
    
    // Events
    event RecordAdded(
        string indexed aadharNumber,
        bytes32 indexed recordHash,
        address indexed hospital,
        string patientName,
        uint256 age
    );
    event HospitalRegistered(address indexed hospital);

    constructor() {
        owner = msg.sender;
        registeredHospitals[msg.sender] = true; // Register contract deployer as first hospital
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyRegisteredHospital() {
        require(registeredHospitals[msg.sender], "Only registered hospitals can call this function");
        _;
    }
    
    function registerHospital(address _hospital) external onlyOwner {
        require(!registeredHospitals[_hospital], "Hospital already registered");
        registeredHospitals[_hospital] = true;
        emit HospitalRegistered(_hospital);
    }
    
    function addRecord(
        string memory _aadharNumber,
        string memory _patientName,
        string memory _patientUID,
        uint256 _age,
        string memory _description,
        string memory _prescription,
        string memory _notes
    ) external onlyRegisteredHospital {
        require(bytes(_aadharNumber).length > 0, "Aadhar number cannot be empty");
        require(bytes(_patientName).length > 0, "Patient name cannot be empty");
        
        // Create record hash from patient data
        bytes32 recordHash = keccak256(
            abi.encodePacked(
                _aadharNumber,
                _patientName,
                _patientUID,
                _age,
                _description,
                _prescription,
                _notes,
                block.timestamp
            )
        );
        
        records[_aadharNumber].push(Record({
            recordHash: recordHash,
            patientName: _patientName,
            patientUID: _patientUID,
            age: _age,
            description: _description,
            prescription: _prescription,
            notes: _notes,
            hospital: msg.sender,
            timestamp: block.timestamp
        }));
        
        emit RecordAdded(_aadharNumber, recordHash, msg.sender, _patientName, _age);
    }
    
    function getRecords(string memory _aadharNumber) external view returns (Record[] memory) {
        return records[_aadharNumber];
    }
    
    function isHospitalRegistered(address _hospital) external view returns (bool) {
        return registeredHospitals[_hospital];
    }
}
