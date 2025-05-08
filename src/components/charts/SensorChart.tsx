import React from 'react';
import { Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SensorInfo } from '../../types';
import { useThemeContext } from '../../hooks/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SensorChartProps {
  sensor: SensorInfo;
}

const SensorChart: React.FC<SensorChartProps> = ({ sensor }) => {
  const { darkMode } = useThemeContext();
  
  const formatChartData = () => {
    const labels = sensor.history.map(item => {
      const date = new Date(item.timestamp);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    });
    
    const values = sensor.history.map(item => item.value);
    
    return {
      labels,
      datasets: [
        {
          label: `${sensor.name} (${sensor.unit})`,
          data: values,
          borderColor: sensor.isAlert ? 'rgba(220, 53, 69, 1)' : 'rgba(40, 167, 69, 1)',
          backgroundColor: sensor.isAlert 
            ? 'rgba(220, 53, 69, 0.1)' 
            : 'rgba(40, 167, 69, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: sensor.isAlert ? 'rgba(220, 53, 69, 1)' : 'rgba(40, 167, 69, 1)',
        },
        {
          label: 'Min',
          data: Array(labels.length).fill(sensor.minThreshold),
          borderColor: 'rgba(255, 193, 7, 0.8)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
        },
        {
          label: 'Max',
          data: Array(labels.length).fill(sensor.maxThreshold),
          borderColor: 'rgba(255, 193, 7, 0.8)',
          borderWidth: 1,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: darkMode ? '#fff' : '#666'
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#fff' : '#666'
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: darkMode ? '#fff' : '#666'
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  return (
    <Card 
      className="h-100 shadow-sm"
      bg={darkMode ? 'dark' : 'light'}
      text={darkMode ? 'light' : 'dark'}
    >
      <Card.Header>
        <h5 className="mb-0">{sensor.name} - Historique des 24 dernières heures</h5>
      </Card.Header>
      <Card.Body>
        <div style={{ height: '300px' }}>
          <Line data={formatChartData()} options={chartOptions} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default SensorChart;
