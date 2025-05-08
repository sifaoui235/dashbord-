import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import SensorsPage from './pages/SensorsPage';
import HistoryPage from './pages/HistoryPage';
import { ThemeProvider } from './hooks/ThemeContext';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sensors" element={<SensorsPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
};

export default App;
