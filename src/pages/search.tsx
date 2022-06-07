import type { NextPage } from "next"
import { useState } from "react"

import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"

import useWeather from "src/hooks/useWeather"
import useLocation from "src/hooks/useLocation"
import useCity from "src/hooks/useCity"
import MainWeatherCard from "src/components/MainWeatherCard"
import { Button, OutlinedInput } from "@mui/material"
import * as d3 from "d3"
import BarChart from "src/components/BarChart"
import { ChartData } from "src/types/Weather"
import { useRouter } from "next/router"
import Link from "next/link"

const Search: NextPage = () => {
    const { push, query } = useRouter()

    const location = useLocation()
    const { weather, loading: weatherLoading } = useWeather({ latitude: location?.coords.latitude, longitude: location?.coords.longitude, city: String(query.q) })
    const loading = weatherLoading
    const [search, setSearch] = useState("")

    const [tempUnit, setTempUnit] = useState<"C" | "F">("C")

    const changeTempUnit = ({ temp }: { temp: "C" | "F" }) => setTempUnit(temp)

    // @ts-ignore
    const data: ChartData[] = weather?.weather.map((w) => ({
        date: Number(w.date[0].split("-")[2]),
        temp: tempUnit === "F" ? Number(w.avgtempF[0]) : Number(w.avgtempC[0]),
    }))

    return loading ? (
        <Grid container height="100vh" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Grid>
    ) : (
        <Grid sx={{ background: "linear-gradient(90deg, rgb(69, 111, 232) 0%, rgb(25, 176, 236) 100%)" }} py="24px" minHeight="100vh" container alignItems="center">
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Link href="/">
                            <a>
                                <Grid container justifyContent="center" alignItems="center" className="glass" sx={{ height: "100%" }}>
                                    Back
                                </Grid>
                            </a>
                        </Link>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <MainWeatherCard
                            //
                            description={weather?.current_condition[0].weatherDesc}
                            humidity={weather?.current_condition[0].humidity}
                            wind={weather?.current_condition[0].windspeedKmph}
                            precipitation={weather?.current_condition[0].precipMM}
                            changeTempUnit={changeTempUnit}
                            tempUnit={tempUnit}
                            temp={tempUnit === "C" ? weather?.current_condition[0].FeelsLikeC : weather?.current_condition[0].FeelsLikeF}
                            image={weather?.current_condition[0].weatherIconUrl[0]}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Grid className="glass" sx={{ borderRadius: "10px", height: "100%" }}>
                            <Typography pb="10px" variant="h4" fontWeight="bold">
                                City
                            </Typography>
                            <Typography>{query.q}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid className="glass" sx={{ borderRadius: "10px", height: "100%" }}>
                            <Typography pb="10px" variant="h4" fontWeight="bold">
                                Other Days
                            </Typography>

                            <BarChart data={data} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}

export default Search
