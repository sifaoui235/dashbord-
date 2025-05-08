import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { sensorData, getUpdatedSensorData } from '../data/mockData';
import { SensorInfo } from '../types';
import { useThemeContext } from '../hooks/ThemeContext';

const SensorsPage: React.FC = () => {
  const { darkMode } = useThemeContext();
  const [sensors, setSensors] = useState<SensorInfo[]>(sensorData);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = getUpdatedSensorData();
      setSensors(updatedData);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="mb-4">Détails des Capteurs</h1>
      <Row>
        <Col>
          <Card
            bg={darkMode ? 'dark' : 'light'}
            text={darkMode ? 'light' : 'dark'}
            className="shadow-sm"
          >
            <Card.Body>
              <Table 
                responsive 
                striped 
                bordered 
                hover
                variant={darkMode ? 'dark' : 'light'}
              >
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Valeur Actuelle</th>
                    <th>Unité</th>
                    <th>Seuil Min</th>
                    <th>Seuil Max</th>
                    <th>État</th>
                  </tr>
                </thead>
                <tbody>
                  {sensors.map(sensor => (
                    <tr key={sensor.id}>
                      <td>{sensor.name}</td>
                      <td>{sensor.description}</td>
                      <td className={sensor.isAlert ? 'text-danger' : 'text-success'}>
                        {sensor.currentValue.toFixed(1)}
                      </td>
                      <td>{sensor.unit}</td>
                      <td>{sensor.minThreshold}</td>
                      <td>{sensor.maxThreshold}</td>
                      <td>
                        <span className={`badge bg-${sensor.isAlert ? 'danger' : 'success'}`}>
                          {sensor.isAlert ? 'Alerte' : 'Normal'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SensorsPage;
