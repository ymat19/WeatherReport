import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

type Props = {
  isRainy: boolean;
};

export const WeatherImage = ({ isRainy }: Props) => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(isRainy);

  return isRainy ? (
    <img src={`${import.meta.env.BASE_URL}/5000choyen.png`} />
  ) : (
    <Clock renderMinuteMarks={false} renderSecondHand={true} value={value} />
  );
};
