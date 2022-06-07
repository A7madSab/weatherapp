import { useEffect, useState } from "react"
import { getCity } from "src/api/Location"
import { City, WeatherResponse } from "src/types/Weather"

interface useCityProps {
    latitude?: number
    longitude?: number
}

const useCity = ({ latitude, longitude }: useCityProps) => {
    const [city, setCity] = useState<City | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!latitude || !longitude) return
        ;(async () => {
            const weatherResponse = await getCity({ latitude, longitude })
            setCity(weatherResponse)
            setLoading(false)
        })()
    }, [latitude, longitude])

    return { city, loading }
}

export default useCity
