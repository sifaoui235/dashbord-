import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { SensorInfo } from '../../types';
import { useThemeContext } from '../../hooks/ThemeContext';
import { IconBaseProps } from 'react-icons';

const CheckIcon = (props: IconBaseProps) => <FaCheckCircle {...props} />;
const WarningIcon = (props: IconBaseProps) => <FaExclamationTriangle {...props} />;

interface SystemStatusWidgetProps {
  sensors: SensorInfo[];
}

const SystemStatusWidget: React.FC<SystemStatusWidgetProps> = ({ sensors }) => {
  const { darkMode } = useThemeContext();
  
  const alertCount = sensors.filter(sensor => sensor.isAlert).length;
  const alertPercentage = (alertCount / sensors.length) * 100;
  
  const getSystemStatus = () => {
    if (alertPercentage === 0) return { 
      status: 'Optimal', 
      variant: 'success', 
      icon: <CheckIcon size={20} />
    };
    if (alertPercentage < 30) return { 
      status: 'Bon', 
      variant: 'info', 
      icon: <CheckIcon size={20} />
    };
    if (alertPercentage < 50) return { 
      status: 'Attention', 
      variant: 'warning', 
      icon: <WarningIcon size={20} />
    };
    return { 
      status: 'Critique', 
      variant: 'danger', 
      icon: <WarningIcon size={20} />
    };
  };
  
  const systemStatus = getSystemStatus();
  
  return (
    <Card 
      className="h-100 shadow-sm"
      bg={darkMode ? 'dark' : 'light'}
      text={darkMode ? 'light' : 'dark'}
    >
      <Card.Header>
        <h5 className="mb-0">État du système</h5>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-3">
          <h2 className={`mb-0 text-${systemStatus.variant} d-flex align-items-center justify-content-center`}>
            <span className="me-2">{systemStatus.icon}</span>
            {systemStatus.status}
          </h2>
        </div>
        
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <span>Capteurs en alerte:</span>
            <span>{alertCount} / {sensors.length}</span>
          </div>
          <ProgressBar>
            <ProgressBar variant="success" now={100 - alertPercentage} key={1} />
            <ProgressBar variant="danger" now={alertPercentage} key={2} />
          </ProgressBar>
        </div>
        
        <div className="text-center">
          {alertCount === 0 ? (
            <span className="text-success">Tous les capteurs fonctionnent normalement</span>
          ) : (
            <span className="text-warning">
              {alertCount} capteur(s) nécessite(nt) votre attention
            </span>
          )}
        </div>
      </Card.Body>
      <Card.Footer className="text-center">
        <small className="text-muted">
          Dernière mise à jour: {new Date().toLocaleTimeString()}
        </small>
      </Card.Footer>
    </Card>
  );
};

export default SystemStatusWidget;
