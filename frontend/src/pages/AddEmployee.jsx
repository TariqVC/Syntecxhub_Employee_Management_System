import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, updateEmployee, getEmployee } from '../api/employeeApi';
import EmployeeForm from '../components/EmployeeForm';
import './AddEmployee.css';

const AddEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [defaultValues, setDefaultValues] = React.useState({});

  React.useEffect(() => {
    if (isEditing) {
      getEmployee(id).then(({ data }) => setDefaultValues(data));
    }
  }, [id, isEditing]);

  const onSubmit = async (formData) => {
    try {
      if (isEditing) {
        await updateEmployee(id, formData);
      } else {
        await createEmployee(formData);
      }
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="add-employee">
      <div className="form-container">
        <div className="form-header">
          <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
          <h2>{isEditing ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
          <p>{isEditing ? 'Update the employee details below' : 'Fill in the details to add a new employee'}</p>
        </div>
        <EmployeeForm onSubmit={onSubmit} defaultValues={defaultValues} isEditing={isEditing} />
      </div>
    </div>
  );
};

export default AddEmployee;