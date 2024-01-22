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
  //console.log(isRainy);

  return (
    <>
      <div style={{ position: "relative" }}>
        {isRainy ? (
          <img src={`${import.meta.env.BASE_URL}/5000choyen.png`} />
        ) : (
          <Clock
            renderMinuteMarks={false}
            renderSecondHand={false}
            value={value}
          />
        )}
      </div>
      <video
        className="video"
        id="video"
        loop
        autoPlay
        style={{
          position: "absolute",
          zIndex: -1,
          opacity: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <source
          src={`${import.meta.env.BASE_URL}/sample-5s.mp4`}
          type="video/mp4"
        />
      </video>
    </>
  );
};
