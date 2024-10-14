import * as d3 from 'd3'
import { hexbin } from 'd3-hexbin'
import { generateData, colorScale } from '../utils/hexbinUtils'
import config from '../config.js'

export default function useHexbinVisualization() {
  const createVisualization = (element) => {
    const { width, height, margin } = config.dimensions
    const { numHexagonsX, numHexagonsY } = config.hexbinConfig

    const effectiveWidth = width + 40
    const effectiveHeight = height + 40

    const radiusX = effectiveWidth / (2 * numHexagonsX)
    const radiusY = effectiveHeight / (Math.sqrt(3) * numHexagonsY)
    const radius = Math.min(radiusX, radiusY)

    const svg = d3.select(element)

    const data = generateData()

    const x = d3.scaleLinear()
      .domain([-2, 4])
      .range([0, effectiveWidth])

    const y = d3.scaleLinear()
      .domain([-2, 2])
      .range([effectiveHeight, 0])

    const hexbinGenerator = hexbin()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .radius(radius)
      .extent([[-radius, -radius], [effectiveWidth + radius, effectiveHeight + radius]])

    const hexbins = hexbinGenerator(data)

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)

    const hexPaths = svg
      .selectAll("path")
      .data(hexbins)
      .enter().append("path")
      .attr("d", hexbinGenerator.hexagon())
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .attr("fill", d => {
        const avgValue = d3.mean(d, h => h.value)
        return colorScale(Math.floor(avgValue))
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", "0.5")
      .on("mouseover", (event, d) => {
        const avgValue = d3.mean(d, h => h.value)
        const level = Math.floor(avgValue) + 1
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(`ID: ${d.length}<br>Status: Level ${level}`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    return hexPaths
  }

  return { createVisualization }
}
