import { SensorInfo } from '../types';

const generateHistoryData = (min: number, max: number, count: number) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(now);
    date.setHours(date.getHours() - (count - i));
    return {
      timestamp: date.toISOString(),
      value: min + Math.random() * (max - min)
    };
  });
};

export const sensorData: SensorInfo[] = [
  {
    id: 'temp-1',
    name: 'Température',
    description: 'Température ambiante',
    unit: '°C',
    minThreshold: 18,
    maxThreshold: 28,
    currentValue: 22.5,
    history: generateHistoryData(16, 30, 24),
    isAlert: false
  },
  {
    id: 'hum-1',
    name: 'Humidité du sol',
    description: 'Humidité du substrat',
    unit: '%',
    minThreshold: 60,
    maxThreshold: 80,
    currentValue: 70,
    history: generateHistoryData(55, 85, 24),
    isAlert: false
  },
  {
    id: 'light-1',
    name: 'Luminosité',
    description: 'Niveau de luminosité',
    unit: 'lux',
    minThreshold: 3000,
    maxThreshold: 10000,
    currentValue: 5500,
    history: generateHistoryData(2000, 12000, 24),
    isAlert: false
  },
  {
    id: 'water-1',
    name: 'Niveau d\'eau',
    description: 'Niveau du réservoir',
    unit: '%',
    minThreshold: 20,
    maxThreshold: 100,
    currentValue: 75,
    history: generateHistoryData(15, 100, 24),
    isAlert: false
  }
];

export const getUpdatedSensorData = (): SensorInfo[] => {
  return sensorData.map(sensor => {
    const newValue = sensor.minThreshold + Math.random() * (sensor.maxThreshold - sensor.minThreshold) * 1.2;
    const isAlert = newValue < sensor.minThreshold || newValue > sensor.maxThreshold;
    
    const newHistory = [...sensor.history.slice(1), {
      timestamp: new Date().toISOString(),
      value: newValue
    }];
    
    return {
      ...sensor,
      currentValue: newValue,
      history: newHistory,
      isAlert
    };
  });
};
