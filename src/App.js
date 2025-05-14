import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import FormPage from './Components/Formpage'; // <-- Correct capitalization
import FormDetail from './Components/FormDetails';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FormPage} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/form/:id" component={FormDetail} />

      </Switch>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar /> {/* Global toast container */}
    </Router>
  );
}

export default App;
