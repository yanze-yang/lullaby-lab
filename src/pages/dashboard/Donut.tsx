import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Profit", "Goal"],
  datasets: [
    {
      label: "# of Votes",
      data: [6000, 20000],
      backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  return (
    <div
      style={{
        margin: "2rem",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "1rem",
      }}
    >
      <Doughnut data={data} />
    </div>
  );
}
