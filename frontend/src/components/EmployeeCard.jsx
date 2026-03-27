import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeCard.css';

const roleColors = {
  Developer: '#667eea',
  Designer: '#f093fb',
  Manager: '#4facfe',
  HR: '#43e97b',
  Sales: '#fa709a',
  Other: '#a18cd1',
};

const EmployeeCard = ({ employee, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      onDelete(employee._id);
    }
  };

  return (
    <div className="employee-card">
      <div className="card-header" style={{ background: `linear-gradient(135deg, ${roleColors[employee.role] || '#a18cd1'}, #1a1a2e)` }}>
        <div className="avatar">{employee.name.charAt(0).toUpperCase()}</div>
        <span className={`status-badge ${employee.status === 'Active' ? 'active' : 'inactive'}`}>
          {employee.status}
        </span>
      </div>
      <div className="card-body">
        <h3>{employee.name}</h3>
        <p className="role" style={{ color: roleColors[employee.role] || '#a18cd1' }}>{employee.role}</p>
        <p className="department">{employee.department}</p>
        <p className="email">{employee.email}</p>
        {employee.phone && <p className="phone">{employee.phone}</p>}
        <p className="salary">R{Number(employee.salary).toLocaleString()}/mo</p>
      </div>
      <div className="card-actions">
        <button className="btn-edit" onClick={() => navigate(`/edit/${employee._id}`)}>Edit</button>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;