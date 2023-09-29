import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    datalabels: {
      anchor: "start",
      align: "end",
      formatter: function (value, context) {
        return context.chart.data.labels[context.dataIndex];
      },
    },
  },
  scales: {
    y: {
      display: false, // Hide the standard labels
    },
  },
};

export default function DashboardPage() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRlNzRmNzkwMjJmMTA1M2IyNTQyMWUiLCJyb2xlIjoiU0EiLCJpYXQiOjE2OTU5MjAwNjMsImV4cCI6MTY5NjE3OTI2M30.ZMb5kQm7xrwN52Qm93cDisbNfQlbnVRVt5KIE6IW4UY";
  const [data, setData] = useState([]);
  const [outletName, setOutletName] = useState([]);
  const labelsfn = (data) => {
    return data.map((d) => d.outletName);
  };

  useEffect(() => {
    axios
      .get("https://v2.onnow.io/api/v1//dashboard/total-orders-by-outlet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setData(data.data);
        const outletNames = labelsfn(data.data);
        setOutletName(outletNames);
      });
  }, []);

  const chartData = {
    labels: outletName,
    datasets: [
      {
        label: "outlet",
        data: data.map((d) => d.totalOrderAmount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
          <Bar options={options} data={chartData} />
        </Typography>
      </Container>
    </>
  );
}
