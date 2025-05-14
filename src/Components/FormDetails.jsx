import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getToken } from '../utils/auth';

const FormDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}form/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => res.ok ? res.json() : Promise.reject('Not found'))
      .then(setForm)
      .catch(err => {
        console.error('Failed to load form:', err);
        alert('Form not found');
        history.push('/admin/dashboard');
      });
  }, [id, history]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}form/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (response.ok) {
          alert('Form deleted successfully');
          history.push('/admin/dashboard');
        } else {
          alert('Failed to delete form');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting form');
      }
    }
  };

  if (!form) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Form Details</h2>
      <div className="card p-4">
        <p><strong>ID:</strong> {form.id}</p>
        <p><strong>Name:</strong> {form.name}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Question:</strong> {form.question}</p>
        <div className="mb-3">
          <strong>Aadhar Photo:</strong><br />
          <img src={form.aadharPhotoUrl} alt="Aadhar" width="300" className="img-thumbnail" />
        </div>
        <div className="mb-3">
          <strong>PAN Photo:</strong><br />
          <img src={form.panPhotoUrl} alt="PAN" width="300" className="img-thumbnail" />
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={() => history.push('/admin/dashboard')}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default FormDetail;
