import { useEffect, useState } from "react"

const useLocation = () => {
    const [location, setLocation] = useState<GeolocationPosition>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation(position)
        })
    }, [])

    return location
}

export default useLocation
