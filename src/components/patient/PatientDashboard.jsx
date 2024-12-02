import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';

export default function PatientDashboard() {
  const { contract, signer, account, loading, error } = useWeb3();
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [recordError, setRecordError] = useState(null);

  useEffect(() => {
    if (contract?.contract && signer && account) {
      fetchRecords();
    }
  }, [contract, signer, account]);

  const fetchRecords = async () => {
    setLoadingRecords(true);
    setRecordError(null);
    try {
      const patientRecords = await contract.contract.getRecords(account);
      console.log('Patient records:', patientRecords);
      setRecords(patientRecords);
    } catch (err) {
      console.error('Error fetching records:', err);
      setRecordError(err.message);
    } finally {
      setLoadingRecords(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Connecting to blockchain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error connecting to blockchain</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-t-lg p-6">
          <h2 className="text-2xl font-bold text-white">My Medical Records</h2>
          <p className="mt-1 text-indigo-100">View and manage your medical history</p>
        </div>

        {loadingRecords ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading records...</p>
          </div>
        ) : recordError ? (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading records</h3>
                  <p className="text-sm text-red-700 mt-1">{recordError}</p>
                </div>
              </div>
            </div>
          </div>
        ) : records.length === 0 ? (
          <div className="p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p className="mt-1 text-sm text-gray-500">No medical records have been added yet.</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {records.map((record, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Record Hash: {record.recordHash}</p>
                      <p className="mt-1 text-sm text-gray-500">Hospital: {record.hospital}</p>
                      <p className="mt-1 text-sm text-gray-500">Added: {new Date(record.timestamp.toNumber() * 1000).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
