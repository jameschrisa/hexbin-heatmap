<template>
  <g>
    <g v-for="colorConfig in colors" :key="colorConfig.value" :transform="`translate(${colorConfig.value * rectWidth}, 0)`">
      <rect
        :width="rectWidth"
        :height="height"
        :fill="colorConfig.color"
        :class="{ inactive: !activeColors.has(colorConfig.value) }"
        @click="toggleColor(colorConfig.value)"
      />
      <text
        :x="rectWidth / 2"
        :y="height + 15"
        text-anchor="middle"
      >{{ colorConfig.label }}</text>
    </g>
  </g>
</template>

<script>
import { ref, computed } from 'vue'
import config from '../config.js'

export default {
  name: 'ColorLegend',
  props: {
    width: Number,
  },
  emits: ['update:activeColors'],
  setup(props, { emit }) {
    const height = 30
    const colors = config.colors
    const rectWidth = computed(() => props.width / colors.length)
    const activeColors = ref(new Set(colors.map(c => c.value)))

    const toggleColor = (value) => {
      if (activeColors.value.has(value)) {
        activeColors.value.delete(value)
      } else {
        activeColors.value.add(value)
      }
      emit('update:activeColors', Array.from(activeColors.value))
    }

    return { height, colors, rectWidth, activeColors, toggleColor }
  }
}
</script>

<style scoped>
rect {
  cursor: pointer;
}
rect.inactive {
  opacity: 0.5;
}
</style>
