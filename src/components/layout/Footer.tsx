import React from 'react';
import { Container } from 'react-bootstrap';
import { useThemeContext } from '../../hooks/ThemeContext';

const Footer: React.FC = () => {
  const { darkMode } = useThemeContext();
  
  return (
    <footer className={`mt-auto py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Container>
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} FraisierTech Dashboard - Système intelligent de culture automatisée
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
