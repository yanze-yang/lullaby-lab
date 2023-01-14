import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import ChartWrapper from "./ChartWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    // {
    //   label: "Dataset 1",
    //   data: [1, 2, 3, 4, 5, 6, 7, 9],
    //   backgroundColor: "rgba(255, 99, 132, 0.5)",
    // },
    {
      label: "Dataset 2",
      data: [1, 2, 3, 4, 5, 6, 7, 9],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Demo() {
  return (
    // <ChartWrapper title="Order">
    <div className="relative h-[50vh] w-full">
      <Bar options={options} data={data} />
    </div>
    // </ChartWrapper>
  );
}
