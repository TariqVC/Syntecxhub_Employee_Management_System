import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../api/employeeApi';
import EmployeeCard from '../components/EmployeeCard';
import './ManageEmployees.css';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees()
      .then(({ data }) => setEmployees(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e._id !== id));
    } catch {
      alert('Failed to delete employee');
    }
  };

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole ? e.role === filterRole : true;
    const matchStatus = filterStatus ? e.status === filterStatus : true;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="manage">
      <div className="manage-header">
        <div>
          <h1>Manage Employees</h1>
          <p>{employees.length} total · {employees.filter(e => e.status === 'Active').length} active</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/employees/add')}>+ Add Employee</button>
      </div>

      {/* Filters */}
      <div className="manage-filters">
        <input
          placeholder="🔍 Search name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="">All Roles</option>
          {['Developer', 'Designer', 'Manager', 'HR', 'Sales', 'Other'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="view-toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>⊞</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>☰</button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="manage-empty">Loading employees...</div>
      ) : filtered.length === 0 ? (
        <div className="manage-empty">No employees found.</div>
      ) : view === 'grid' ? (
        <div className="employees-grid">
          {filtered.map(emp => (
            <EmployeeCard key={emp._id} employee={emp} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="list-view">
          {filtered.map(emp => (
            <div className="list-row" key={emp._id}>
              <div className="list-avatar">{emp.name.charAt(0).toUpperCase()}</div>
              <div className="list-info">
                <p className="list-name">{emp.name}</p>
                <span>{emp.email}</span>
              </div>
              <span className="list-role">{emp.role}</span>
              <span className="list-dept">{emp.department}</span>
              <span className="list-salary">R{Number(emp.salary).toLocaleString()}</span>
              <span className={`badge ${emp.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>{emp.status}</span>
              <div className="list-actions">
                <button onClick={() => navigate(`/employees/edit/${emp._id}`)}>✏️</button>
                <button onClick={() => { if (window.confirm(`Delete ${emp.name}?`)) handleDelete(emp._id); }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;