import React, { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { sensorData } from '../data/mockData';
import SensorChart from '../components/charts/SensorChart';
import { useThemeContext } from '../hooks/ThemeContext';
import { SensorInfo } from '../types';

const HistoryPage: React.FC = () => {
  const { darkMode } = useThemeContext();
  const [selectedSensor, setSelectedSensor] = useState<string>(sensorData[0].id);

  const currentSensor = sensorData.find(s => s.id === selectedSensor) as SensorInfo;

  return (
    <div>
      <h1 className="mb-4">Historique des Mesures</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card
            bg={darkMode ? 'dark' : 'light'}
            text={darkMode ? 'light' : 'dark'}
            className="shadow-sm"
          >
            <Card.Body>
              <Form.Group>
                <Form.Label>Sélectionner un capteur</Form.Label>
                <Form.Select
                  value={selectedSensor}
                  onChange={(e) => setSelectedSensor(e.target.value)}
                  className={darkMode ? 'bg-dark text-light' : ''}
                >
                  {sensorData.map(sensor => (
                    <option key={sensor.id} value={sensor.id}>
                      {sensor.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card
            bg={darkMode ? 'dark' : 'light'}
            text={darkMode ? 'light' : 'dark'}
            className="shadow-sm"
          >
            <Card.Body>
              <div style={{ height: '400px' }}>
                <SensorChart sensor={currentSensor} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card
            bg={darkMode ? 'dark' : 'light'}
            text={darkMode ? 'light' : 'dark'}
            className="shadow-sm"
          >
            <Card.Header>
              <h5 className="mb-0">Statistiques du capteur</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className="text-center">
                    <h6>Valeur Actuelle</h6>
                    <h3 className={currentSensor.isAlert ? 'text-danger' : 'text-success'}>
                      {currentSensor.currentValue.toFixed(1)} {currentSensor.unit}
                    </h3>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <h6>Seuil Minimum</h6>
                    <h3>{currentSensor.minThreshold} {currentSensor.unit}</h3>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <h6>Seuil Maximum</h6>
                    <h3>{currentSensor.maxThreshold} {currentSensor.unit}</h3>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <h6>État</h6>
                    <h3>
                      <span className={`badge bg-${currentSensor.isAlert ? 'danger' : 'success'}`}>
                        {currentSensor.isAlert ? 'Alerte' : 'Normal'}
                      </span>
                    </h3>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HistoryPage;
