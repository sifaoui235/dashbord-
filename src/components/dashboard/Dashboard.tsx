import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaSync } from 'react-icons/fa';
import SensorCard from '../widgets/SensorCard';
import SensorChart from '../charts/SensorChart';
import AlertsWidget from '../widgets/AlertsWidget';
import SystemStatusWidget from '../widgets/SystemStatusWidget';
import { sensorData, getUpdatedSensorData } from '../../data/mockData';
import { SensorInfo } from '../../types';
import { useThemeContext } from '../../hooks/ThemeContext';
import { IconBaseProps } from 'react-icons';

const SyncIcon = (props: IconBaseProps) => <FaSync {...props} />;

const Dashboard: React.FC = () => {
  const { darkMode } = useThemeContext();
  const [sensors, setSensors] = useState<SensorInfo[]>(sensorData);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      updateSensorData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const updateSensorData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const updatedData = getUpdatedSensorData();
      setSensors(updatedData);
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 800);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Tableau de bord</h1>
        <div>
          <small className="me-3 text-muted">
            Dernière mise à jour: {lastUpdate.toLocaleTimeString()}
          </small>
          <Button 
            variant={darkMode ? 'outline-light' : 'outline-primary'} 
            size="sm"
            onClick={updateSensorData}
            disabled={isLoading}
            className="d-flex align-items-center"
          >
            <span className={`me-2 ${isLoading ? 'fa-spin' : ''}`}>
              <SyncIcon size={16} />
            </span>
            {isLoading ? 'Mise à jour...' : 'Actualiser'}
          </Button>
        </div>
      </div>

      <Row className="mb-4">
        <Col md={6} className="mb-4 mb-md-0">
          <SystemStatusWidget sensors={sensors} />
        </Col>
        <Col md={6}>
          <AlertsWidget sensors={sensors} />
        </Col>
      </Row>

      <h2 className="mb-3">Capteurs</h2>
      <Row className="mb-4 g-3">
        {sensors.map(sensor => (
          <Col key={sensor.id} lg={3} md={6} sm={12}>
            <SensorCard sensor={sensor} />
          </Col>
        ))}
      </Row>

      <h2 className="mb-3">Graphiques</h2>
      <Row className="g-3">
        {sensors.map(sensor => (
          <Col key={`chart-${sensor.id}`} lg={6} md={12} className="mb-4">
            <SensorChart sensor={sensor} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
