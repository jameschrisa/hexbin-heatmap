import * as d3 from 'd3'
import config from '../config.js'

export const generateData = () => {
  return Array.from({ length: config.dataPoints }, () => ({
    x: Math.random() * 6 - 2,
    y: Math.random() * 4 - 2,
    value: Math.floor(Math.random() * config.colors.length)
  }))
}

export const colorScale = d3.scaleOrdinal()
  .domain(config.colors.map(c => c.value))
  .range(config.colors.map(c => c.color))
