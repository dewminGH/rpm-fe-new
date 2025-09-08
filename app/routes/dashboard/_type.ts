export type SingleRpmRecord = {
  id: number;
  co2: number;
  light: number;
  temperature: number;
  container_type: string;
  device_secret: string;
  fan_speed: number;
  humidity: number;
};
export type SocketData = {
  lastTenRecords: SingleRpmRecord[];
  latest: SingleRpmRecord;
};
