import * as d3 from "d3"
import { useEffect, useRef } from "react"

const useD3 = (renderChartFn: any, dependencies: any[]) => {
    const ref = useRef()

    useEffect(() => {
        // @ts-ignore
        renderChartFn(d3.select(ref?.current))
        // @ts-ignore
    }, dependencies)

    return ref
}

export default useD3
