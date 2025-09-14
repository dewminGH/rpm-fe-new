import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000";

const device_secret =
  typeof window !== "undefined" ? localStorage.getItem("dsc") : null;

export const socket = io(URL, {
  auth: { device_secret },
});
