export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  min: number;
  max: number;
  isAlert: boolean;
}

export interface SensorHistory {
  timestamp: string;
  value: number;
}

export interface SensorInfo {
  id: string;
  name: string;
  description: string;
  unit: string;
  minThreshold: number;
  maxThreshold: number;
  currentValue: number;
  history: SensorHistory[];
  isAlert: boolean;
}

export type SensorType = 'temperature' | 'humidity' | 'light' | 'soilMoisture' | 'waterLevel';

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
