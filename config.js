export default {
  colors: [
    { value: 0, color: "#FFFFD4", label: "Level 1" },
    { value: 1, color: "#E1F0C1", label: "Level 2" },
    { value: 2, color: "#5EC8BA", label: "Level 3" },
    { value: 3, color: "#3344AB", label: "Level 4" },
    { value: 4, color: "#1A1E6C", label: "Level 5" }
  ],
  dimensions: {
    width: 800,
    height: 600,
    margin: { top: 60, right: 20, bottom: 20, left: 20 }
  },
  hexbinConfig: {
    numHexagonsX: 20,  // Reduced from previous value
    numHexagonsY: 15   // Reduced from previous value
  },
  dataPoints: 2000
}
