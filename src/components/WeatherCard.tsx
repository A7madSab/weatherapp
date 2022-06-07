import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { FC } from "react"
import { formateDate } from "src/helpers"
import { Weather } from "src/types/Weather"

const WeatherCard: FC<Weather> = ({ date, maxtempC, mintempC }) => {
    return (
        <Grid container spacing={3}>
            <Grid item>
                <Typography>{formateDate({ date: date[0] })}</Typography>
            </Grid>
            <Grid item>
                <Typography>
                    {maxtempC} - {mintempC}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default WeatherCard
