import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatchRequest = useCallback(async (requestInfo, responseConsumer) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestInfo.url, {
        headers: requestInfo?.headers || {},
        body: requestInfo?.body ? JSON.stringify(requestInfo.body) : null,
        method: requestInfo?.method || "GET",
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      responseConsumer(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    dispatchRequest,
  };
};

export default useHttp;
