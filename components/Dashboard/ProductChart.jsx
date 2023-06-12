import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
// 2. Register them

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

import { FetchCollection } from "@/Api/Apis";
const ProductChart = ({ products }) => {
  const { data } = FetchCollection("reviews");
  const [urls, setUrls] = useState("");
  const labels = products.map((product) => product.Name.slice(0, 3));
  const ratings = products.map((product) => product.rating);
  const imageUrls = products.map((product) => product.imageUrl);

  useEffect(() => {
    // Check if running in the browser environment
    if (typeof window !== "undefined") {
      const images = imageUrls.map((imageUrl) => {
        const img = new Image(35, 35);
        img.src = imageUrl;
        return img;
      });
      setUrls(images);
    }
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          labelPointStyle: (context) => {
            const index = context.dataIndex;
            const image = urls[index];
            return {
              pointStyle: image,
            };
          },
        },
      },
    },
    elements: {
      tension: 0,
      borderWidth: 2,
      line: {
        borderColor: "rgba(47, 97,68, 1)",
        backgroundColor: "rgba(47,97,68, 0.3)",
        fill: "start",
      },
      radius: 0,
      point: {
        hitRadius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // starts the y-axis from 0
            stepSize: 1, // sets the interval between ticks to 1
            suggestedMax: 5, // sets the maximum value of the y-axis
          },
        },
      ],
    },
  };

  // console.log(products);
  const ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Rating",
        data: ratings,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
        pointRadius: 4, // Increase the size of the pointer
      },
    ],
  };

  return (
    <div className="rounded-lg bg-dark text-white">
      <p className="text-center justify-center text-white font-bold text-xl">
        Product Rating Chart
      </p>
      <div className="flex p-2 items-start justify-between gap-3">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-[11.875rem]">
            <span className="mt-1 mr-2 flex h-4 w-4 max-w-[1rem] items-center justify-center rounded-full border border-primary">
              <span className="block h-2 w-2 max-w-[0.625rem] rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-bold text-primary">Number Of Products</p>
              <p className="text-sm font-medium">{products.length}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-4 max-w-[1rem] items-center justify-center rounded-full border border-gray-600">
              <span className="block h-2 w-2 max-w-[0.625rem] rounded-full bg-gray-400"></span>
            </span>
            <div className="w-full">
              <p className="font-bold text-gray-600">Total Reviews</p>
              <p className="text-sm font-medium">{data.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div id="chartOne" className="bg-dark p-2 rounded-lg">
          <Line options={options} data={ChartData} />
        </div>
      </div>
    </div>
  );
};

export default ProductChart;
