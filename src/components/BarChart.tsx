import useD3 from "src/hooks/useD3"
import React, { FC } from "react"
import * as d3 from "d3"
import { ChartData } from "src/types/Weather"

interface BarChartProp {
    data: ChartData[]
}

const BarChart: FC<BarChartProp> = ({ data }) => {
    const ref = useD3(
        (svg: any) => {
            const height = 500
            const width = 600
            const margin = { top: 20, right: 30, bottom: 30, left: 40 }

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.date))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1)

            const y1 = d3
                .scaleLinear()
                // @ts-ignore
                .domain([0, d3.max(data, (d: ChartData) => d.temp)])
                .rangeRound([height - margin.bottom, margin.top])

            const xAxis = (g: any) =>
                g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                    d3
                        .axisBottom(x)
                        // @ts-ignore
                        .tickValues(d3.ticks(...d3.extent(x.domain()), width / 40).filter((v) => x(v) !== undefined))
                        .tickSizeOuter(0)
                )

            const y1Axis = (g:any) =>
                g
                    .attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y1).ticks(null, "s"))
                    .call((g: any) => g.select(".domain").remove())

            svg.select(".x-axis").call(xAxis)
            svg.select(".y-axis").call(y1Axis)

            svg.select(".plot-area")
                .attr("fill", "steelblue")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x", (d: ChartData) => x(d.date))
                .attr("width", x.bandwidth())
                .attr("y", (d: ChartData) => y1(d.temp))
                .attr("height", (d: ChartData) => y1(0) - y1(d.temp))
        },
        [data.length]
    )

    return (
        <svg
            // @ts-ignore
            ref={ref}
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    )
}

export default BarChart
