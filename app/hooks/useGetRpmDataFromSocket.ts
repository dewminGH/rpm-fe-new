import { useEffect, useState } from "react";
import type { SingleRpmRecord, SocketData } from "~/routes/dashboard/_type";
import { socket } from "~/socket";

const useGetRpmDataFromSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const [socketData, setSocketData] = useState<SingleRpmRecord[]>([]);
  const [piLiveData, setPiLiveData] = useState<SingleRpmRecord | null>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    console.log("xxxxxxxxxxx");
    function onConnect() {
      console.log("connected to socket.io");
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onRpmSync(socketData: SocketData) {
      setIsDeviceConnected(true);
      console.log("rpm-sync-value", socketData);
      setSocketData(socketData.lastTenRecords);
      setPiLiveData(socketData.latest);
    }

    // attach listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("rpm-sync", onRpmSync);

    if (!socket.connected) socket.connect();

    if (socket.connected) onConnect();

    setTrigger(false);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("rpm-sync", onRpmSync);
    };
  }, [trigger]);

  return {
    isConnected,
    socketData,
    piLiveData,
    trigger,
    setTrigger,
    isDeviceConnected,
  };
};

export default useGetRpmDataFromSocket;
