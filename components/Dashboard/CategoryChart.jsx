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
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

import { FetchCollection } from "@/Api/Apis";
import { useEffect, useState } from "react";

let totalRevenue = 0;
const CategoryChart = () => {
  const { data: ordersData } = FetchCollection("orders");
  const { data: categoryData } = FetchCollection("category");
  const [sales, setSales] = useState([]);
  const [urls, setUrls] = useState("");

  const labels = sales.map((category) => category.Category.slice(0, 6));
  const imageUrls = sales.map((category) => category.imageUrl);
  const sale = sales.map((category) => category.sales);

  useEffect(() => {
    const calculateSalesByCategory = () => {
      const updatedCategoryData = categoryData.map((category) => {
        const salesByCategory = ordersData.reduce((count, order) => {
          const matchingItems = order.items.filter(
            (product) => product && product.Category === category.Category
          );
          return count + matchingItems.length;
        }, 0);
        return { ...category, sales: salesByCategory };
      });
      setSales(updatedCategoryData);
    };

    calculateSalesByCategory();
  }, [ordersData, categoryData]);

  useEffect(() => {
    // Check if running in the browser environment
    if (typeof window !== "undefined") {
      const images = imageUrls.map((imageUrl) => {
        const img = new Image(25, 25);
        img.src = imageUrl;
        return img;
      });
      setUrls(images);
    }
  }, [sales]);

  let totalRevenue = 0;
  ordersData.forEach((order) => {
    totalRevenue += order.orderAmount;
  });

  const options = {
    responsive: true,
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
  };

  // console.log(sales);
  const ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: sale,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
        borderColor: "rgba(0, 128, 0, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="bg-dark rounded-lg p-2">
      <p className="text-center justify-center text-white font-bold text-xl">
        Category Sales Chart
      </p>
      <div className="flex p-2 items-start justify-between gap-3 text-white">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-[11.875rem]">
            <span className="mt-1 mr-2 flex h-4 w-4 max-w-[1rem] items-center justify-center rounded-full border border-primary">
              <span className="block h-2 w-2 max-w-[0.625rem] rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-bold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">Ksh.{totalRevenue}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-4 max-w-[1rem] items-center justify-center rounded-full border border-gray-600">
              <span className="block h-2 w-2 max-w-[0.625rem] rounded-full bg-gray-400"></span>
            </span>
            <div className="w-full">
              <p className="font-bold text-gray-600">Number Categories</p>
              <p className="text-sm font-medium">{categoryData.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="chartOne">
          <Bar options={options} data={ChartData} />
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;
