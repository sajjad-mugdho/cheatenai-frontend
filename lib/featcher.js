import useSWR from "swr";
import axios from "axios";

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export function useFetchData(apiUrl) {
  const { data, error, mutate } = useSWR(apiUrl, fetcher, {
    refreshInterval: 1000,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
