import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  

const Battery = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '路徑規劃掃地機 電池修耗量',
          },
        },
      };
      
      const labels = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
      
      const data = {
        labels,
        datasets: [
          {
            label: '電池電量',
            data: ['100', '90', '75', '60', '80', '95', '86'],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

    return (
        <div style={{height: '80vh'}}>
            <Line options={options} data={data} />
        </div>
    );
}

export default Battery;