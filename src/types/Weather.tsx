export interface WeatherResponse {
    request: Request[]
    current_condition: {
        [key: string]: string
        humidity: string
        wind: string
        precipitation: string
        weatherDesc: string
    }[]
    weather: Weather[]
    ClimateAverages: ClimateAverage[]
}

export interface ClimateAverage {
    month: Month[]
}

export interface Month {
    index: string[]
    name: string[]
    avgMinTemp: string[]
    avgMinTemp_F: string[]
    absMaxTemp: string[]
    absMaxTemp_F: string[]
    avgDailyRainfall: string[]
}

export interface Request {
    type: string[]
    query: string[]
}

export interface Weather {
    date: string[]
    astronomy: Astronomy[]
    maxtempC: string[]
    maxtempF: string[]
    mintempC: string[]
    mintempF: string[]
    avgtempC: string[]
    avgtempF: string[]
    totalSnow_cm: string[]
    sunHour: string[]
    uvIndex: string[]
    hourly: {
        weatherIconUrl: string[]
        [key: string]: string[]
    }[]
}

export interface Astronomy {
    sunrise: Sunrise[]
    sunset: string[]
    moonrise: string[]
    moonset: string[]
    moon_phase: string[]
    moon_illumination: string[]
}

export enum Sunrise {
    The0452Am = "04:52 AM",
    The0453Am = "04:53 AM",
    The0454Am = "04:54 AM",
}

export interface City {
    request: Request[]
    time_zone: TimeZone[]
}

export interface Request {
    type: string[]
    query: string[]
}

export interface TimeZone {
    localtime: string[]
    utcOffset: string[]
    zone: string[]
}

export interface ChartData {
    date: string
    temp: number
}
