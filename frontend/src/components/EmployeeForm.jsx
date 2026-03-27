import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './EmployeeForm.css';

const ROLES = ['Developer', 'Designer', 'Manager', 'HR', 'Sales', 'Other'];
const DEPARTMENTS = ['Engineering', 'Design', 'Management', 'Human Resources', 'Sales', 'Finance', 'Marketing', 'Other'];

const EmployeeForm = ({ onSubmit, defaultValues, isEditing }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue, 
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues });

  useEffect(() => { reset(defaultValues); }, [defaultValues, reset]);

  const selectedRole = watch('role');
  const selectedDept = watch('department');

  // If editing and value isn't in the preset list, pre-select "Other"
  useEffect(() => {
    if (defaultValues?.role && !ROLES.includes(defaultValues.role)) {
      setValue('role', 'Other');
      setValue('customRole', defaultValues.role);
    }
    if (defaultValues?.department && !DEPARTMENTS.includes(defaultValues.department)) {
      setValue('department', 'Other');
      setValue('customDepartment', defaultValues.department);
    }
  }, [defaultValues, setValue]);

  const onFormSubmit = (data) => {
    const finalData = {
      ...data,
      role: data.role === 'Other' ? data.customRole : data.role,
      department: data.department === 'Other' ? data.customDepartment : data.department,
    };
    delete finalData.customRole;
    delete finalData.customDepartment;
    return onSubmit(finalData);
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-grid">

        <div className="form-group">
          <label>Full Name *</label>
          <input placeholder="John Doe" {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'At least 2 characters' }
          })} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" placeholder="john@company.com" {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' }
          })} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Role *</label>
          <select {...register('role', { required: 'Role is required' })}>
            <option value="">-- Select Role --</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.role && <span className="error">{errors.role.message}</span>}
        </div>

        {/* Custom Role — shows only when Other is selected */}
        {selectedRole === 'Other' && (
          <div className="form-group">
            <label>Specify Role *</label>
            <input
              placeholder="e.g. DevOps Engineer"
              {...register('customRole', { required: 'Please specify the role' })}
            />
            {errors.customRole && <span className="error">{errors.customRole.message}</span>}
          </div>
        )}

        {/* Department */}
        <div className="form-group">
          <label>Department *</label>
          <select {...register('department', { required: 'Department is required' })}>
            <option value="">-- Select Department --</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.department && <span className="error">{errors.department.message}</span>}
        </div>

        {/* Custom Department — shows only when Other is selected */}
        {selectedDept === 'Other' && (
          <div className="form-group">
            <label>Specify Department *</label>
            <input
              placeholder="e.g. Cybersecurity"
              {...register('customDepartment', { required: 'Please specify the department' })}
            />
            {errors.customDepartment && <span className="error">{errors.customDepartment.message}</span>}
          </div>
        )}

        <div className="form-group">
          <label>Salary (R/month) *</label>
          <input type="number" placeholder="25000" {...register('salary', {
            required: 'Salary is required',
            min: { value: 0, message: 'Salary cannot be negative' }
          })} />
          {errors.salary && <span className="error">{errors.salary.message}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input placeholder="+27 82 000 0000" {...register('phone', {
            pattern: { value: /^\+?[\d\s\-]{7,15}$/, message: 'Invalid phone number' }
          })} />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>

        <div className="form-group">
          <label>Status</label>
          <select {...register('status')}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

      </div>

      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : isEditing ? '✅ Update Employee' : '➕ Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;