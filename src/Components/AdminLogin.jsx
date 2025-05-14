import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { saveToken } from '../utils/auth';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const AdminLogin = () => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      saveToken(result.token);
      history.push('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    alert('Login failed');
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('username')} placeholder="Username" className="form-control mb-2" />
          <input {...register('password')} type="password" placeholder="Password" className="form-control mb-2" />
          {errors.username?.message || errors.password?.message}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
