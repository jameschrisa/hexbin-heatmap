<template>
  <div id="app">
    <h1>Hexbin Heatmap</h1>
    <HexbinHeatmap />
  </div>
</template>

<script>
import HexbinHeatmap from './components/HexbinHeatmap.vue'

export default {
  name: 'App',
  components: {
    HexbinHeatmap
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 0;
}

h1 {
  margin-bottom: 20px;
}
</style>
