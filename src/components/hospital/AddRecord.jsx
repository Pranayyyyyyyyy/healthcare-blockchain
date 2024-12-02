import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { ethers } from 'ethers';

export default function AddRecord() {
    const { contract, account } = useWeb3();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');
    const [isHospitalRegistered, setIsHospitalRegistered] = useState(false);

    const [formData, setFormData] = useState({
        aadharNumber: '',
        patientName: '',
        patientUID: '',
        age: '',
        description: '',
        prescription: '',
        notes: ''
    });

    // Check if hospital is registered
    useEffect(() => {
        const checkHospitalRegistration = async () => {
            if (contract && account) {
                try {
                    const isRegistered = await contract.contract.registeredHospitals(account);
                    setIsHospitalRegistered(isRegistered);
                } catch (err) {
                    console.error('Error checking hospital registration:', err);
                }
            }
        };
        checkHospitalRegistration();
    }, [contract, account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'aadharNumber') {
            // Only allow numbers and format with spaces
            const formatted = value
                .replace(/[^0-9]/g, '')
                .slice(0, 12)
                .replace(/(\d{4})/g, '$1 ')
                .trim();
            setFormData(prev => ({ ...prev, [name]: formatted }));
        } else if (name === 'age') {
            // Only allow numbers for age
            const age = parseInt(value);
            if (!isNaN(age) && age >= 0 && age <= 150) {
                setFormData(prev => ({ ...prev, [name]: age.toString() }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateAadhar = (number) => {
        const cleanNumber = number.replace(/\s/g, '');
        if (cleanNumber.length !== 12) {
            throw new Error('Aadhar number must be 12 digits');
        }
        return cleanNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);
        setTransactionHash('');

        try {
            if (!contract?.contract) {
                throw new Error('Please connect your wallet');
            }

            if (!isHospitalRegistered) {
                throw new Error('This address is not registered as a hospital');
            }

            // Validate Aadhar
            const validAadhar = validateAadhar(formData.aadharNumber);

            // Validate required fields
            if (!formData.patientName) throw new Error('Patient name is required');
            if (!formData.patientUID) throw new Error('Patient UID is required');
            if (!formData.age) throw new Error('Age is required');
            if (!formData.description) throw new Error('Description is required');
            if (!formData.prescription) throw new Error('Prescription is required');

            console.log('Sending transaction...');

            // This will trigger MetaMask
            const tx = await contract.contract.addRecord(
                validAadhar,
                formData.patientName,
                formData.patientUID,
                parseInt(formData.age),
                formData.description,
                formData.prescription,
                formData.notes || ''
            );

            setTransactionHash(tx.hash);
            console.log('Transaction sent:', tx.hash);

            // Wait for transaction to be mined
            await tx.wait();
            console.log('Transaction confirmed');

            setSubmitSuccess(true);
            // Clear form
            setFormData({
                aadharNumber: '',
                patientName: '',
                patientUID: '',
                age: '',
                description: '',
                prescription: '',
                notes: ''
            });
        } catch (error) {
            console.error('Error adding record:', error);
            setSubmitError(error.message || 'Error adding record');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Medical Record</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Patient Information Section */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Patient Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                                    Aadhar Number *
                                </label>
                                <input
                                    type="text"
                                    name="aadharNumber"
                                    id="aadharNumber"
                                    required
                                    value={formData.aadharNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter 12-digit Aadhar number"
                                />
                            </div>

                            <div>
                                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                                    Patient Name *
                                </label>
                                <input
                                    type="text"
                                    name="patientName"
                                    id="patientName"
                                    required
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter patient name"
                                />
                            </div>

                            <div>
                                <label htmlFor="patientUID" className="block text-sm font-medium text-gray-700">
                                    Patient UID *
                                </label>
                                <input
                                    type="text"
                                    name="patientUID"
                                    id="patientUID"
                                    required
                                    value={formData.patientUID}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter patient UID"
                                />
                            </div>

                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                    Age *
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    id="age"
                                    required
                                    min="0"
                                    max="150"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter patient age"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Medical Details Section */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Medical Details</h3>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                required
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter medical condition description"
                            />
                        </div>

                        <div>
                            <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">
                                Prescription *
                            </label>
                            <textarea
                                name="prescription"
                                id="prescription"
                                required
                                rows={3}
                                value={formData.prescription}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter prescription details"
                            />
                        </div>

                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                Additional Notes
                            </label>
                            <textarea
                                name="notes"
                                id="notes"
                                rows={3}
                                value={formData.notes}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter any additional notes (optional)"
                            />
                        </div>
                    </div>

                    {submitError && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{submitError}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">
                                        Record added successfully!
                                        {transactionHash && (
                                            <span className="block text-xs mt-1">
                                                Transaction Hash: {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.aadharNumber || formData.aadharNumber.replace(/\s/g, '').length !== 12}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Adding Record...' : 'Add Medical Record'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
