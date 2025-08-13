import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/auth/sign-in/index.tsx"),
  route("/dashboard", "routes/dashboard/index.tsx"),
] satisfies RouteConfig;
