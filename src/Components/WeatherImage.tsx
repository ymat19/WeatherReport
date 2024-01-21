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
        style={{
          position: "absolute",
          zIndex: -1,
          opacity: 0,
          width: "100%", // 必要に応じてサイズを調整してね♥
          height: "100%", // これもね♥
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
