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

const Home: NextPage = () => {
    const location = useLocation()
    const { weather, loading: weatherLoading } = useWeather({ latitude: location?.coords.latitude, longitude: location?.coords.longitude })
    const { city, loading: cityLoading } = useCity({ latitude: location?.coords.latitude, longitude: location?.coords.longitude })
    const loading = weatherLoading || cityLoading
    const { push } = useRouter()
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
                    <Grid item md={8} xs={12}>
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
                            <Typography>{city?.time_zone[0].localtime}</Typography>
                            <Typography>{city?.time_zone[0].zone}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid className="glass" sx={{ borderRadius: "10px", height: "100%" }}>
                            <Typography pb="10px" variant="h4" fontWeight="bold">
                                Other Days
                            </Typography>

                            <BarChart
                                // @ts-check
                                data={data}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid className="glass" sx={{ borderRadius: "10px" }}>
                            <Typography pb="10px" variant="h4" fontWeight="bold">
                                Other Cities (Type in the city name)
                            </Typography>
                            <Grid flexWrap="nowrap" spacing="24px" container alignItems="center">
                                <Grid item flexGrow={1}>
                                    <OutlinedInput fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                                </Grid>

                                <Grid item>
                                    <Button onClick={() => push(`/search?q=${search}`)} sx={{ height: "56px" }} variant="outlined">
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}

export default Home
