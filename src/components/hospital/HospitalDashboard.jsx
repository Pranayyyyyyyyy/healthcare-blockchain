import React, { useState } from 'react';
import AddRecord from './AddRecord';
import ViewRecords from './ViewRecords';

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('add')}
                className={`px-6 py-2 rounded-md ${
                  activeTab === 'add'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                } transition-colors duration-200`}
              >
                Add Record
              </button>
              <button
                onClick={() => setActiveTab('view')}
                className={`px-6 py-2 rounded-md ${
                  activeTab === 'view'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                } transition-colors duration-200`}
              >
                View Records
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'add' ? <AddRecord /> : <ViewRecords />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
