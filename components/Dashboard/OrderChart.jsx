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

const OrderChart = () => {
  const { data } = FetchCollection("orders");
  // Create a new array of order status
  const array = [];
  data.map((item) => {
    const { orderStatus } = item;
    return array.push(orderStatus);
  });

  // Calculate the orderAmount
  let totalRevenue = 0;
  data.forEach((order) => {
    totalRevenue += order.orderAmount;
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q4] = ["Processing", "Delivered", "Cancelled"];

  const processing = getOrderCount(array, q1);
  const delivered = getOrderCount(array, q2);
  const cancelled = getOrderCount(array, q4);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
    labels: ["Processing", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [processing, delivered, cancelled],
        backgroundColor: "rgba(0, 128, 0, 0.5)",
        borderColor: "rgba(0, 128, 0, 1)",
      },
    ],
  };
  return (
    <div className="bg-dark rounded-lg p-2">
      <p className="text-center justify-center text-white font-bold text-xl">
        Order Chart
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
              <p className="font-bold text-gray-600">Total Sales</p>
              <p className="text-sm font-medium">{data.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="chartOne">
          <Line options={options} data={ChartData} />
        </div>
      </div>
    </div>
  );
};

export default OrderChart;
