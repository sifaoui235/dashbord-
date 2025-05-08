import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { 
  FaThermometerHalf, 
  FaTint, 
  FaSun, 
  FaWater 
} from 'react-icons/fa';
import { SensorInfo } from '../../types';
import { useThemeContext } from '../../hooks/ThemeContext';
import { IconBaseProps } from 'react-icons';

const ThermometerIcon = (props: IconBaseProps) => <FaThermometerHalf {...props} />;
const TintIcon = (props: IconBaseProps) => <FaTint {...props} />;
const SunIcon = (props: IconBaseProps) => <FaSun {...props} />;
const WaterIcon = (props: IconBaseProps) => <FaWater {...props} />;

interface SensorCardProps {
  sensor: SensorInfo;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor }) => {
  const { darkMode } = useThemeContext();
  
  const getSensorIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('température')) 
      return <ThermometerIcon size={24} />;
    if (lowerName.includes('humidité')) 
      return <TintIcon size={24} />;
    if (lowerName.includes('luminosité')) 
      return <SunIcon size={24} />;
    if (lowerName.includes('eau')) 
      return <WaterIcon size={24} />;
    return <ThermometerIcon size={24} />;
  };

  const getStatusColor = () => {
    if (sensor.isAlert) return 'danger';
    if (sensor.currentValue > sensor.minThreshold && 
        sensor.currentValue < sensor.maxThreshold) return 'success';
    return 'warning';
  };

  return (
    <Card 
      className={`h-100 shadow-sm ${sensor.isAlert ? 'border-danger' : ''}`}
      bg={darkMode ? 'dark' : 'light'}
      text={darkMode ? 'light' : 'dark'}
    >
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className={`me-2 text-${getStatusColor()}`}>
            {getSensorIcon(sensor.name)}
          </div>
          <span>{sensor.name}</span>
        </div>
        {sensor.isAlert && (
          <Badge bg="danger" pill>
            Alerte
          </Badge>
        )}
      </Card.Header>
      <Card.Body className="text-center">
        <h2 className={`display-4 ${sensor.isAlert ? 'text-danger' : ''}`}>
          {sensor.currentValue.toFixed(1)}
          <small className="fs-6 ms-1">{sensor.unit}</small>
        </h2>
        <Card.Text>
          <small className="text-muted">
            Min: {sensor.minThreshold} {sensor.unit} | Max: {sensor.maxThreshold} {sensor.unit}
          </small>
        </Card.Text>
        <Card.Text>{sensor.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SensorCard;
