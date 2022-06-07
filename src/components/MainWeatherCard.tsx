import { FC } from "react"
import Image from "next/image"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

interface MainWeatherCardProps {
    image?: string
    temp?: string
    tempUnit?: string
    humidity?: string
    wind?: string
    precipitation?: string
    changeTempUnit?: any
    description?: string
}

const MainWeatherCard: FC<MainWeatherCardProps> = ({ description, image, temp, changeTempUnit, tempUnit, humidity, wind, precipitation }) => {
    return (
        <Grid className="glass" sx={{ borderRadius: "10px", height: "100%" }}>
            <Typography variant="h4" fontWeight="bold" pb="10px">
                Current Weather
            </Typography>
            <Grid container alignItems="center" columnSpacing={2}>
                <Grid item sm={2} xs={2} container alignItems="center" justifyContent="center">
                    <Image style={{ borderRadius: "50%" }} src={image || ""} alt="weahter" width={80} height={80} />
                </Grid>
                <Grid item container sm={6} xs={10}>
                    <Grid item>{description}</Grid>
                    <Grid item container>
                        <Typography variant="h3">{temp}</Typography>
                        <Typography variant="h4">
                            <sup>
                                <span className={tempUnit === "C" ? "selected-unit" : "unit"} onClick={() => changeTempUnit({ temp: "C" })}>
                                    °C
                                </span>
                                <span> | </span>
                                <span className={tempUnit === "F" ? "selected-unit" : "unit"} onClick={() => changeTempUnit({ temp: "F" })}>
                                    °F
                                </span>
                            </sup>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Typography fontWeight="regular" variant="subtitle2">
                        Precipitation: {precipitation}%
                    </Typography>
                    <Typography fontWeight="regular" variant="subtitle2">
                        Humidity: {humidity}%
                    </Typography>
                    <Typography fontWeight="regular" variant="subtitle2">
                        Wind: {wind} km/h
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MainWeatherCard
