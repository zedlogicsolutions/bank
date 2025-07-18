// src/components/Staff.jsx

import React from 'react';
import '../style/Staff.css';

const staffList = [
  { id: 'STF001', name: 'John Doe', service: 'Deposit', status: 'Active' },
  { id: 'STF002', name: 'Jane Smith', service: 'Withdraw', status: 'Active' },
  { id: 'STF003', name: 'Samuel Johnson', service: 'Loan', status: 'On Leave' },
  { id: 'STF004', name: 'Priya Patel', service: 'Customer Service', status: 'Active' },
  { id: 'STF005', name: 'Ali Khan', service: 'ATM', status: 'Active' },
  { id: 'STF006', name: 'Linda Ray', service: 'Account Service', status: 'Active' },
];

const Staff = () => {
  return (
    <div className="staff-container">
      <h1>👥 Staff Details</h1>

      <table className="staff-table">
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Assigned Service</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={index}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.service}</td>
              <td className={staff.status === 'Active' ? 'status-active' : 'status-leave'}>
                {staff.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;
