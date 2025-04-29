import { useEffect, useState } from "react";

export function useCurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime(); // actualiza apenas carga
    const interval = setInterval(updateTime, 1000); // cada segundo

    return () => clearInterval(interval); // cleanup
  }, []);

  return time;
}