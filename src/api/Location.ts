import axios from "axios"
import { City, WeatherResponse } from "src/types/Weather"
import { parseStringPromise } from "xml2js"

export const getWeather = async ({ latitude, longitude, city }: { city?: string; latitude: number; longitude: number }): Promise<WeatherResponse> => {
    const { data } = await axios.request<any>({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API}/weather.ashx`,
        params: {
            key: process.env.NEXT_PUBLIC_API_KEY,
            q: city ? city : `${latitude},${longitude}`,
        },
    })

    const weather: { data: WeatherResponse } = await parseStringPromise(data)

    return weather.data
}

export const getCity = async ({ latitude, longitude }: { latitude: number; longitude: number }): Promise<City> => {
    const { data } = await axios.request<any>({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API}/tz.ashx`,
        params: {
            format: "json",
            key: process.env.NEXT_PUBLIC_API_KEY,
            q: `${latitude},${longitude}`,
        },
    })

    return data.data
}
