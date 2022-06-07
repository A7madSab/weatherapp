import { useEffect, useState } from "react"
import { getWeather } from "src/api/Location"
import { WeatherResponse } from "src/types/Weather"

interface UseWeatherProps {
    latitude?: number
    longitude?: number
    city?: string
}

const useWeather = ({ latitude, longitude, city }: UseWeatherProps) => {
    const [weather, setWeather] = useState<WeatherResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!latitude || !longitude) return
        ;(async () => {
            const weatherResponse = await getWeather({ latitude, longitude, city })
            setWeather(weatherResponse)
            setLoading(false)
        })()
    }, [latitude, longitude])

    return { weather, loading }
}

export default useWeather
