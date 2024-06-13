// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterInstitution from './components/RegisterInstitution';
import IncidentForm from './components/IncidentForm';
import Container from '@mui/material/Container';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterInstitution />} />
          <Route path="/report-incident" element={<IncidentForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
