import React from "react"
import { CacheProvider } from "@emotion/react"
import { ThemeProvider, CssBaseline } from "@mui/material"

import createEmotionCache from "src/utils/createEmotionCache"
import theme from "src/theme"
import "src/styles/globals.css"
import { AppProps } from "next/app"

const clientSideEmotionCache = createEmotionCache()

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    )
}

export default MyApp
