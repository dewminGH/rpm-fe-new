import { useState } from "react";
import { useNavigate } from "react-router";
import api from "~/axios";

type LoginPayload = {
  user_name: string;
  password: string;
  device_sc: string;
};

type LoginResponse = {
  message: string;
  access_token: string;
  data: {
    user_name: string;
    device_sc: string;
  } | null;
  user_id?: string;
};

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LoginResponse | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post<LoginResponse>("/auth/login/", payload);

      setData(res.data);
      console.log(res.data);
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("username", res.data.data?.user_name ?? "");
        localStorage.setItem("dsc", res.data.data?.device_sc ?? "");
        localStorage.setItem("u-id", res.data?.user_id ?? "");
        navigate("/dashboard");
      }

      if (!res.data.data) {
        setError(res.data.message as unknown as string);
      }
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, data };
};

export default useLogin;
