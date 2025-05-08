import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import { useThemeContext } from '../../hooks/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useThemeContext();
  
  return (
    <div className={`d-flex flex-column min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Navbar />
      <Container className="flex-grow-1 mb-4">
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
