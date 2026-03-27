import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeApi';
import EmployeeCard from '../components/EmployeeCard';
import './Home.css';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employees', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      alert('Failed to delete employee');
    }
  };

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole ? e.role === filterRole : true;
    return matchSearch && matchRole;
  });

  return (
    <div className="home">
      <div className="home-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p>{employees.length} total employees</p>
        </div>
        <div className="filters">
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
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading employees...</div>
      ) : filtered.length === 0 ? (
        <div className="empty">No employees found. Try adding one!</div>
      ) : (
        <div className="employees-grid">
          {filtered.map(emp => (
            <EmployeeCard key={emp._id} employee={emp} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;