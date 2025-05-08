import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaSun, FaMoon, FaLeaf } from 'react-icons/fa';
import { useThemeContext } from '../../hooks/ThemeContext';
import { IconBaseProps } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';

const LeafIcon = (props: IconBaseProps) => <FaLeaf {...props} />;
const SunIcon = (props: IconBaseProps) => <FaSun {...props} />;
const MoonIcon = (props: IconBaseProps) => <FaMoon {...props} />;

const AppNavbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const location = useLocation();

  return (
    <Navbar 
      bg={darkMode ? 'dark' : 'light'} 
      variant={darkMode ? 'dark' : 'light'} 
      expand="lg" 
      className="mb-4 shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="me-2 text-success">
            <LeafIcon size={20} />
          </span>
          <span>FraisierTech Dashboard</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/"
              active={location.pathname === '/'}
            >
              Tableau de bord
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/sensors"
              active={location.pathname === '/sensors'}
            >
              Capteurs
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/history"
              active={location.pathname === '/history'}
            >
              Historique
            </Nav.Link>
          </Nav>
          <Button 
            variant={darkMode ? 'outline-light' : 'outline-dark'} 
            onClick={toggleDarkMode}
            className="d-flex align-items-center"
          >
            <span className="me-2">
              {darkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            </span>
            {darkMode ? 'Mode clair' : 'Mode sombre'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
