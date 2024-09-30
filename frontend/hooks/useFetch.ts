import { config } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = ({
  url,
  method = "get",
  params = {},
  body = {},
}: {
  url: string;
  method?: string;
  params?: any;
  body?: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      const resp = await axios({
        method,
        url,
        params,
        data: body,
        baseURL: config.baseUrl,
      });
      const data = await resp?.data;
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, method]);

  const refetch = () => {
    fetchData();
  };

  return { isLoading, data, error, refetch };
};
