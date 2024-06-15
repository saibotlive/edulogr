import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import IncidentForm from './components/IncidentForm';
import SignIncident from './components/SignIncident';
import RegisterInstitution from './components/RegisterInstitution';
import Login from './components/Login';
import GlobalSnackbar from './components/GlobalSnackbar';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Statistics from './components/Statistics';

const App = () => {
  return (
    <Router>
      <GlobalSnackbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/report-incident"
            element={
              <ProtectedRoute>
                <IncidentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-incident/:id"
            element={
              <ProtectedRoute>
                <SignIncident />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterInstitution />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
