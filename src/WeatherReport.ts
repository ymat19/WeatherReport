
export interface WeatherReport {
    publishingOffice: string;
    reportDatetime: string;
    timeSeries: TimeSeries[];
    tempAverage?: TemperatureAverage;
    precipAverage?: PrecipitationAverage;
}

interface TimeSeries {
    timeDefines: string[];
    areas: AreaData[];
}

interface AreaData {
    area: Area;
    weatherCodes?: string[];
    weathers?: string[];
    winds?: string[];
    waves?: string[];
    pops?: string[];
    reliabilities?: string[];
    temps?: string[];
    tempsMin?: string[];
    tempsMinUpper?: string[];
    tempsMinLower?: string[];
    tempsMax?: string[];
    tempsMaxUpper?: string[];
    tempsMaxLower?: string[];
}

interface Area {
    name: string;
    code: string;
}

interface TemperatureAverage {
    areas: TemperatureArea[];
}

interface PrecipitationAverage {
    areas: PrecipitationArea[];
}

interface TemperatureArea {
    area: Area;
    min: string;
    max: string;
}

interface PrecipitationArea {
    area: Area;
    min: string;
    max: string;
}