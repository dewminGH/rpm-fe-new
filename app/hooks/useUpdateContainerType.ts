import { useState } from "react";
import api from "~/axios";

type UpdateContainerTypePayload = {
  user_id: number;
  container_type: string;
};

const useUpdateContainerType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const callUpdateContainerType = async (
    payload: UpdateContainerTypePayload
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await api.put("auth/update_container_type/", payload);
      setSuccess(true);

      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update container type");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { callUpdateContainerType, loading, error, success };
};

export default useUpdateContainerType;
