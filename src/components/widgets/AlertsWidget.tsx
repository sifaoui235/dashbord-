import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import { SensorInfo } from '../../types';
import { useThemeContext } from '../../hooks/ThemeContext';
import { IconBaseProps } from 'react-icons';

const WarningIcon = (props: IconBaseProps) => <FaExclamationTriangle {...props} />;

interface AlertsWidgetProps {
  sensors: SensorInfo[];
}

const AlertsWidget: React.FC<AlertsWidgetProps> = ({ sensors }) => {
  const { darkMode } = useThemeContext();
  
  const alertSensors = sensors.filter(sensor => sensor.isAlert);
  
  return (
    <Card 
      className="h-100 shadow-sm"
      bg={darkMode ? 'dark' : 'light'}
      text={darkMode ? 'light' : 'dark'}
      border={alertSensors.length > 0 ? 'danger' : ''}
    >
      <Card.Header className="d-flex align-items-center">
        <span className="text-danger me-2">
          <WarningIcon size={20} />
        </span>
        <h5 className="mb-0">Alertes</h5>
        {alertSensors.length > 0 && (
          <Badge bg="danger" pill className="ms-2">
            {alertSensors.length}
          </Badge>
        )}
      </Card.Header>
      <Card.Body>
        {alertSensors.length === 0 ? (
          <div className="text-center py-4">
            <p className="mb-0 text-success">Aucune alerte active</p>
          </div>
        ) : (
          <ListGroup variant={darkMode ? 'dark' : 'light'}>
            {alertSensors.map(sensor => (
              <ListGroup.Item 
                key={sensor.id}
                className="d-flex justify-content-between align-items-center"
                variant="danger"
              >
                <div>
                  <strong>{sensor.name}</strong>
                  <p className="mb-0 small">
                    Valeur actuelle: {sensor.currentValue.toFixed(1)} {sensor.unit}
                  </p>
                </div>
                <div>
                  <small>
                    Seuils: {sensor.minThreshold} - {sensor.maxThreshold} {sensor.unit}
                  </small>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
      {alertSensors.length > 0 && (
        <Card.Footer className="text-center">
          <small className="text-danger">
            Attention: {alertSensors.length} capteur(s) nécessite(nt) votre attention
          </small>
        </Card.Footer>
      )}
    </Card>
  );
};

export default AlertsWidget;
