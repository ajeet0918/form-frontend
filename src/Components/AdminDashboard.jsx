import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apiGet } from '../utils/api';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    apiGet('form')
      .then(setData)
      .catch(err => console.error('Failed to load data', err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Question</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.question}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => history.push(`/admin/form/${entry.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No data found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
