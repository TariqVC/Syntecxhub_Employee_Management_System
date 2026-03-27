import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../api/employeeApi';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import './Dashboard.css';

const COLORS = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#a18cd1'];

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="stat-icon" style={{ background: `${color}20` }}>{icon}</div>
    <div className="stat-info">
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees()
      .then(({ data }) => setEmployees(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="dash-loading">Loading dashboard...</div>;

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const avgSalary = totalEmployees
    ? Math.round(employees.reduce((sum, e) => sum + Number(e.salary), 0) / totalEmployees)
    : 0;

  const departments = [...new Set(employees.map(e => e.department))];

  // Role chart data
  const roleCounts = employees.reduce((acc, e) => {
    acc[e.role] = (acc[e.role] || 0) + 1;
    return acc;
  }, {});
  const roleData = Object.entries(roleCounts).map(([name, value]) => ({ name, value }));

  // Department chart data
  const deptCounts = employees.reduce((acc, e) => {
    acc[e.department] = (acc[e.department] || 0) + 1;
    return acc;
  }, {});
  const deptData = Object.entries(deptCounts).map(([name, count]) => ({ name, count }));

  // Recent employees
  const recent = [...employees].slice(0, 5);

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dash-header">
        <div>
          <h1>Welcome back 👋</h1>
          <p>Here's what's happening with your team today.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/employees/add')}>
          + Add Employee
        </button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard icon="👥" label="Total Employees" value={totalEmployees} color="#667eea" />
        <StatCard icon="✅" label="Active" value={activeEmployees} color="#43e97b" />
        <StatCard icon="💤" label="Inactive" value={totalEmployees - activeEmployees} color="#fa709a" />
        <StatCard icon="🏢" label="Departments" value={departments.length} color="#4facfe" />
        <StatCard icon="💰" label="Avg Salary" value={`R${avgSalary.toLocaleString()}`} color="#f093fb" />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Employees by Role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {roleData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Employees by Department</h3>
          {deptData.length === 0 ? (
            <p className="no-data">No department data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
                <XAxis dataKey="name" angle={-30} textAnchor="end" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {deptData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Employees */}
      <div className="recent-card">
        <div className="recent-header">
          <h3>Recent Employees</h3>
          <button onClick={() => navigate('/employees')}>View All →</button>
        </div>
        {recent.length === 0 ? (
          <p className="no-data">No employees yet. <span onClick={() => navigate('/employees/add')}>Add one!</span></p>
        ) : (
          <div className="recent-table-wrapper">
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(emp => (
                  <tr key={emp._id}>
                    <td>
                      <div className="table-name">
                        <div className="table-avatar">{emp.name.charAt(0).toUpperCase()}</div>
                        <div>
                          <p>{emp.name}</p>
                          <span>{emp.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{emp.role}</td>
                    <td>{emp.department}</td>
                    <td>R{Number(emp.salary).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${emp.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;