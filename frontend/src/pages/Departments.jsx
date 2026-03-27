import React, { useEffect, useState } from 'react';
import { getEmployees } from '../api/employeeApi';
import './Departments.css';

const COLORS = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#a18cd1', '#fda085', '#96fbc4'];

const Departments = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getEmployees()
      .then(({ data }) => setEmployees(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const departments = employees.reduce((acc, emp) => {
    if (!acc[emp.department]) acc[emp.department] = [];
    acc[emp.department].push(emp);
    return acc;
  }, {});

  const deptList = Object.entries(departments);
  const selectedEmployees = selected ? departments[selected] || [] : [];

  if (loading) return <div className="dept-loading">Loading departments...</div>;

  return (
    <div className="departments">
      <div className="dept-header">
        <h1>🏢 Departments</h1>
        <p>{deptList.length} departments · {employees.length} total employees</p>
      </div>

      {deptList.length === 0 ? (
        <div className="dept-empty">No departments found. Add some employees first!</div>
      ) : (
        <div className="dept-layout">

          {/* Department Cards */}
          <div className="dept-cards">
            {deptList.map(([name, emps], i) => {
              const active = emps.filter(e => e.status === 'Active').length;
              const color = COLORS[i % COLORS.length];
              return (
                <div
                  key={name}
                  className={`dept-card ${selected === name ? 'dept-card-selected' : ''}`}
                  onClick={() => setSelected(selected === name ? null : name)}
                  style={{ borderLeft: `5px solid ${color}` }}
                >
                  <div className="dept-card-icon" style={{ background: `${color}20`, color }}>
                    🏢
                  </div>
                  <div className="dept-card-info">
                    <h3>{name}</h3>
                    <p>{emps.length} employee{emps.length !== 1 ? 's' : ''} · {active} active</p>
                  </div>
                  <div className="dept-card-count" style={{ color }}>{emps.length}</div>
                </div>
              );
            })}
          </div>

          {/* Employee Panel */}
          {selected && (
            <div className="dept-panel">
              <div className="panel-header">
                <h2>🏢 {selected}</h2>
                <button onClick={() => setSelected(null)}>✕</button>
              </div>
              <p className="panel-sub">{selectedEmployees.length} employee{selectedEmployees.length !== 1 ? 's' : ''}</p>

              <div className="panel-employees">
                {selectedEmployees.map(emp => (
                  <div className="panel-emp-row" key={emp._id}>
                    <div className="panel-avatar">{emp.name.charAt(0).toUpperCase()}</div>
                    <div className="panel-emp-info">
                      <p className="panel-emp-name">{emp.name}</p>
                      <span>{emp.role} · {emp.email}</span>
                    </div>
                    <div className="panel-emp-right">
                      <p className="panel-salary">R{Number(emp.salary).toLocaleString()}</p>
                      <span className={`badge ${emp.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                        {emp.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Departments;