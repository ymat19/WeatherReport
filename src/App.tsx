import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { WeatherImage } from "./Components/WeatherImage";
import { AreaData, SelectedAreaInfo } from "./AreaData";
import { SelectArea } from "./Components/SelectArea";
import { WeatherReport } from "./WeatherReport";

const centeredStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", // 画面の高さに合わせる
};

const getAreaData = async (
  setAreaData: React.Dispatch<SetStateAction<AreaData | null>>
) => {
  const response = await fetch(
    "https://www.jma.go.jp/bosai/common/const/area.json"
  );
  const areaData: AreaData = await response.json();
  setAreaData(areaData);
};

const getWeatherReport = async (
  areaInfo: SelectedAreaInfo,
  setRainy: React.Dispatch<boolean>
) => {
  const response = await fetch(
    `https://www.jma.go.jp/bosai/forecast/data/forecast/${areaInfo.parent}.json`
  );
  const weatherReport: WeatherReport[] = await response.json();
  console.log(weatherReport);
  setRainy(
    weatherReport[0].timeSeries[0].areas
      .find((item) => item.area.code === areaInfo.id)
      ?.weathers?.[0]?.includes("雨") || false
  );
};

function App() {
  const [isRainy, setRainy] = useState(false);
  //const [area, setArea] = useState(false);
  const [areaData, setAreaData] = useState<AreaData | null>(null);
  const [selectedArea, setSelectedArea] = useState<SelectedAreaInfo | null>(
    null
  );

  useEffect(() => {
    getAreaData(setAreaData);
  }, []);

  useEffect(() => {
    selectedArea && getWeatherReport(selectedArea, setRainy);
    const task = setInterval(() => {
      console.log("called");
      console.log(selectedArea);
      selectedArea && getWeatherReport(selectedArea, setRainy);
    }, 1000 * 60 * 5);

    return () => clearInterval(task);
  }, [selectedArea]);

  return (
    <div style={centeredStyle}>
      {selectedArea ? null : (
        <SelectArea areaData={areaData} setSelectedArea={setSelectedArea} />
      )}
      {selectedArea && <WeatherImage isRainy={isRainy} />}
    </div>
  );
}

export default App;
