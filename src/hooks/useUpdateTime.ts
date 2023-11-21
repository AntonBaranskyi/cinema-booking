import { useEffect, useState } from "react";

export const useUpdateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalTime);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { formattedTime };
};
