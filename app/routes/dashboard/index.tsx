import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample data for the RPM graph
  const rpmData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: "Fan RPM",
        data: Array.from(
          { length: 24 },
          () => Math.floor(Math.random() * 3000) + 1000
        ),
        borderColor: "#4fd1c5",
        backgroundColor: "rgba(79, 209, 197, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#a0aec0",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(160, 174, 192, 0.1)",
        },
        ticks: {
          color: "#a0aec0",
        },
      },
      y: {
        grid: {
          color: "rgba(160, 174, 192, 0.1)",
        },
        ticks: {
          color: "#a0aec0",
        },
      },
    },
  };

  // Sample metrics data
  const metrics = [
    {
      title: "Total Power Output",
      value: "245 kW",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Energy Consumption",
      value: "1.24 MW",
      change: "-3.2%",
      trend: "down",
    },
    {
      title: "System Efficiency",
      value: "92.4%",
      change: "+1.8%",
      trend: "up",
    },
    { title: "Uptime", value: "99.7%", change: "+0.3%", trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto p-4">
        {/* RPM Graph Section */}
        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">
              Fan RPM Over Time
            </h2>
            <div className="h-80">
              <Line data={rpmData} options={options} />
            </div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-gray-400 text-sm font-medium">
                {metric.title}
              </h3>
              <p className="text-2xl font-bold my-2">{metric.value}</p>
              <div
                className={`flex items-center ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}
              >
                {metric.trend === "up" ? (
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
                <span className="text-sm">{metric.change}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Additional Content */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Alerts */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">
              Recent Alerts
            </h2>
            <div className="space-y-4">
              {[
                "Temperature warning",
                "Pressure fluctuation",
                "Maintenance due",
                "System update available",
              ].map((alert, index) => (
                <div key={index} className="flex items-start">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 mr-3 ${index % 2 === 0 ? "bg-red-500" : "bg-yellow-500"}`}
                  ></div>
                  <div>
                    <p className="font-medium">{alert}</p>
                    <p className="text-sm text-gray-400">
                      2{index} minutes ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">
              System Status
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Engine",
                "Cooling",
                "Power",
                "Control",
                "Sensors",
                "Network",
              ].map((system, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-4 text-center"
                >
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium">{system}</h3>
                  <p
                    className={`text-sm ${index % 3 === 0 ? "text-green-400" : "text-gray-400"}`}
                  >
                    {index % 3 === 0 ? "Operational" : "Normal"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
