import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  TimeScale,
  TimeSeriesScale
);

const EvolutionChart = ({ data, title, dataType }) => {
  const config: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        ticks: {
          color: "white",
        },
        grid: {
          borderColor: "white",
          tickColor: "white",
          color: "#3a6ace",
        },
      },
      x: {
        type: "time",
        time: {
          unit: "day",
          format: "dd/MM/YY",
          tooltipFormat: "dd/MM/yyyy",
        },

        ticks: { color: "white" },
        grid: {
          borderColor: "white",
          tickColor: "white",
          color: "#3a6ace",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "white",
        text: title,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  const datasets = {
    datasets: [
      {
        label: `Nombre de ${dataType}`,
        data: data.map((row) => ({ x: new Date(row.date), y: row.count })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Chart type="line" data={datasets} options={config} />
    </div>
  );
};

export default EvolutionChart;
