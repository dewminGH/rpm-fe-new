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
import { useMemo } from "react";
import { Button, LottieAnimator } from "../../components";
import { useGetRpmDataFromSocket } from "~/hooks";
import { graph_options } from "~/constants/raw-objects";
import ConnectingJSON from "../../animations/connecting.json";
import { ServerIcon, CpuChipIcon, SignalIcon } from "@heroicons/react/24/solid";

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

const DashboardRPMHome = () => {
  const { isConnected, piLiveData, setTrigger, socketData, isDeviceConnected } =
    useGetRpmDataFromSocket();

  const handleReconnect = () => {
    setTrigger(true);
  };

  const rpmData = {
    labels: socketData.map(({ temperature }) => temperature),
    datasets: [
      {
        label: "Fan RPM",
        data: socketData.map(({ fan_speed }) => fan_speed),
        borderColor: "#4fd1c5",
        backgroundColor: "rgba(79, 209, 197, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const systems = useMemo(() => {
    return [
      {
        name: "Live Server",
        status: isConnected,
        icon: ServerIcon,
      },
      {
        name: "Sensors",
        status: !!piLiveData,
        icon: CpuChipIcon,
      },
      {
        name: "Device Connection",
        status: isDeviceConnected,
        icon: SignalIcon,
      },
    ];
  }, [isConnected, isDeviceConnected, piLiveData]);

  // Sample metrics data
  const metrics = useMemo(
    () => [
      {
        title: "Device Secret ID",
        value: piLiveData?.device_secret ?? "N/A",
      },
      {
        title: "Fan Speed",
        value: piLiveData?.fan_speed.toFixed(3) ?? 0,
      },
      {
        title: "Temperature",
        value: piLiveData?.temperature.toFixed(3) ?? 0,
      },
      {
        title: "Light",
        value: piLiveData?.light.toFixed(3) ?? 0,
      },
      {
        title: "CO2",
        value: piLiveData?.co2.toFixed(3) ?? 0,
      },
      {
        title: "Container Type",
        value: piLiveData?.container_type ?? "N/A",
      },
      {
        title: "Humidity",
        value: piLiveData?.humidity.toFixed(3) ?? 0,
      },
      {
        title: "Active type",
        value: "FAN / TEMP",
      },
    ],
    [piLiveData]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto p-4">
        {/* RPM Graph Section */}
        {isConnected && isDeviceConnected ? (
          <section className="mb-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-200">
                Fan RPM Over Temp
              </h2>
              <div className="h-80 w-full">
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Line data={rpmData} options={graph_options} />
              </div>
            </div>
          </section>
        ) : (
          <div className="w-full flex justify-center">
            <div className="bg-gray-900/80 rounded-lg p-6 m-8 flex items-center justify-center absolute md:w-[600px] md:h-[600px] shadow-lg shadow-purple-900 flex-col">
              <div className="md:w-[400px] md:h-[400px]">
                <LottieAnimator json={ConnectingJSON} />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-gray-300 text-center">
                {isConnected
                  ? "We are try connect with your device. please check device powered on"
                  : "We could not connect our live server please try again shorty"}
              </h2>
              <div>
                <Button variant="primary" onClick={handleReconnect}>
                  Reconnect
                </Button>
              </div>
            </div>
          </div>
        )}
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
            </div>
          ))}
        </section>
        {/* Metrics Grid */}
        <section className="grid grid-cols-1 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">
              System Status
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {systems.map((system, index) => {
                const Icon = system.icon;
                const statusColor = system.status
                  ? "text-green-400"
                  : "text-red-500";
                const bgColor = system.status
                  ? "bg-green-500/20"
                  : "bg-red-500/20";
                return (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg p-4 text-center"
                  >
                    <div
                      className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon className="w-6 h-6 text-gray-100" />
                    </div>
                    <h3 className="font-medium text-gray-100">{system.name}</h3>
                    <p className={`text-sm ${statusColor}`}>
                      {system.status ? "Connected" : "Disconnected"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardRPMHome;
