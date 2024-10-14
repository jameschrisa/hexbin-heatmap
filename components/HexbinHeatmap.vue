<template>
  <div class="hexbin-container" :style="{ width: `${totalWidth}px`, height: `${totalHeight}px` }">
    <div class="legend-container">
      <svg :width="totalWidth" :height="legendHeight">
        <ColorLegend
          :width="totalWidth - 40"
          @update:activeColors="updateVisibleHexbins"
        />
      </svg>
    </div>
    <svg :width="totalWidth" :height="hexbinHeight" :viewBox="`-20 -20 ${totalWidth + 40} ${hexbinHeight + 40}`">
      <g :transform="`translate(${dimensions.margin.left},${dimensions.margin.top})`">
        <g ref="hexbinGroup"></g>
      </g>
    </svg>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import * as d3 from 'd3'
import ColorLegend from './ColorLegend.vue'
import useHexbinVisualization from '../composables/useHexbinVisualization'
import { colorScale } from '../utils/hexbinUtils'
import config from '../config.js'

export default {
  name: 'HexbinHeatmap',
  components: {
    ColorLegend
  },
  setup() {
    const hexbinGroup = ref(null)
    const { createVisualization } = useHexbinVisualization()
    const dimensions = config.dimensions
    let hexPaths

    const legendHeight = 60
    const totalWidth = computed(() => dimensions.width + dimensions.margin.left + dimensions.margin.right + 40)
    const hexbinHeight = computed(() => dimensions.height + dimensions.margin.top + dimensions.margin.bottom + 40)
    const totalHeight = computed(() => hexbinHeight.value + legendHeight)

    onMounted(() => {
      hexPaths = createVisualization(hexbinGroup.value)
    })

    const updateVisibleHexbins = (activeColorValues) => {
      hexPaths.style("opacity", d => {
        const avgValue = d3.mean(d, h => h.value)
        const colorValue = Math.floor(avgValue)
        return activeColorValues.includes(colorValue) ? 1 : 0.1
      })
    }

    return { 
      hexbinGroup, 
      dimensions, 
      updateVisibleHexbins,
      totalWidth,
      totalHeight,
      hexbinHeight,
      legendHeight
    }
  }
}
</script>

<style scoped>
.hexbin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  overflow: visible;
  padding: 20px;
  box-sizing: content-box;
}

.legend-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

:deep(.tooltip) {
  position: absolute;
  text-align: center;
  padding: 8px;
  font: 12px sans-serif;
  background: white;
  border: 1px solid #aaa;
  border-radius: 8px;
  pointer-events: none;
}
</style>
