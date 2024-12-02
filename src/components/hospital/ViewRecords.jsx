import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';

export default function ViewRecords() {
  const { contract, account } = useWeb3();
  const [aadharNumber, setAadharNumber] = useState('');
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHospitalRegistered, setIsHospitalRegistered] = useState(false);

  // Check if hospital is registered
  useEffect(() => {
    const checkHospitalRegistration = async () => {
      if (contract?.contract && account) {
        try {
          const isRegistered = await contract.contract.registeredHospitals(account);
          console.log('Hospital registration status:', isRegistered);
          setIsHospitalRegistered(isRegistered);
        } catch (err) {
          console.error('Error checking hospital registration:', err);
        }
      }
    };
    checkHospitalRegistration();
  }, [contract, account]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!contract?.contract) {
      setError('Please connect your wallet first');
      return;
    }
    
    if (!isHospitalRegistered) {
      setError('This address is not registered as a hospital');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Searching for records with Aadhar:', aadharNumber);
      const cleanAadhar = aadharNumber.replace(/\s/g, '');
      console.log('Clean Aadhar:', cleanAadhar);
      
      const patientRecords = await contract.contract.getRecords(cleanAadhar);
      console.log('Raw records from blockchain:', patientRecords);
      
      const formattedRecords = patientRecords.map(record => {
        console.log('Processing record:', record);
        // Access the struct fields directly
        return {
          recordHash: record.recordHash,
          patientName: record.patientName,
          patientUID: record.patientUID,
          age: record.age.toString(),
          description: record.description,
          prescription: record.prescription,
          notes: record.notes,
          hospital: record.hospital,
          timestamp: new Date(Number(record.timestamp) * 1000).toLocaleString()
        };
      });

      console.log('Formatted records:', formattedRecords);
      setRecords(formattedRecords);
      setError('');
      if (formattedRecords.length === 0) {
        setError('No records found for this Aadhar number');
      }
    } catch (error) {
      console.error('Error details:', error);
      setError('Error fetching records: ' + error.message);
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, '')
      .slice(0, 12)
      .replace(/(\d{4})/g, '$1 ')
      .trim();
    setAadharNumber(value);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">View Patient Records</h2>
      
      {!isHospitalRegistered && (
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-md mb-6">
          Warning: Your address is not registered as a hospital. Please register first.
        </div>
      )}
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="mb-4">
          <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Number
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              id="aadhar"
              value={aadharNumber}
              onChange={handleAadharChange}
              placeholder="1234 5678 9123"
              className="flex-1 p-2 border rounded-md"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2"
              disabled={isLoading || !isHospitalRegistered}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⌛</span>
                  Searching...
                </>
              ) : (
                'Search Records'
              )}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {records.length > 0 && (
        <div className="space-y-6">
          {records.map((record, index) => (
            <div key={`${record.recordHash}-${index}`} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-gray-900">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-indigo-600">Patient Information</h3>
                  <div className="space-y-2 text-black">
                    <p><span className="font-medium text-gray-900">Name:</span> {record.patientName}</p>
                    <p><span className="font-medium text-gray-900">UID:</span> {record.patientUID}</p>
                    <p><span className="font-medium text-gray-900">Age:</span> {record.age}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-indigo-600">Record Details</h3>
                  <div className="space-y-2 text-black">
                    <p><span className="font-medium text-gray-900">Hospital:</span> {record.hospital}</p>
                    <p><span className="font-medium text-gray-900">Date:</span> {record.timestamp}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-indigo-600">Medical Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900">Description:</p>
                    <p className="mt-1 text-black">{record.description}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Prescription:</p>
                    <p className="mt-1 text-black">{record.prescription}</p>
                  </div>
                  {record.notes && (
                    <div>
                      <p className="font-medium text-gray-900">Notes:</p>
                      <p className="mt-1 text-black">{record.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
