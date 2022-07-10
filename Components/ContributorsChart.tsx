import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  DoughnutController,
  ArcElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  DoughnutController,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ContributorsChart = ({ data, title, dataType }) => {
  const config: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: title,
        color: "white",
      },
    },
  };
  const datasets = {
    labels: data.map((d) => d.username),
    datasets: [
      {
        label: "Contributions",
        data: data.map((d) => d.count),
        backgroundColor: [
          "#0074D9",
          "#FF4136",
          "#2ECC40",
          "#FF851B",
          "#7FDBFF",
          "#B10DC9",
          "#FFDC00",
          "#001f3f",
          "#39CCCC",
          "#01FF70",
          "#85144b",
          "#F012BE",
          "#3D9970",
          "#111111",
          "#AAAAAA",
        ],
      },
    ],
  };

  return (
    <div>
      <Chart type="doughnut" data={datasets} options={config} />
    </div>
  );
};

export default ContributorsChart;
