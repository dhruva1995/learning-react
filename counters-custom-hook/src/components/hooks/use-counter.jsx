import { useEffect, useState } from "react";

const useCounter = (countForward = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countForward) {
        setCounter((prev) => prev + 1);
      } else {
        setCounter((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countForward]);

  return counter;
};

export default useCounter;
