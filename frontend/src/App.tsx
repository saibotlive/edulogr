import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RegisterInstitution from './components/RegisterInstitution';
import Login from './components/Login';
import IncidentForm from './components/IncidentForm';
import SignIncident from './components/SignIncident';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterInstitution />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/report-incident"
            element={
              <ProtectedRoute>
                <IncidentForm />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-incident/:id" element={<SignIncident />} />
        </Routes>
      </Container>
    </Router>
  );
}
