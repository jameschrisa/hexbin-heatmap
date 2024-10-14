# Hexbin Heatmap Project Structure

This document provides a detailed explanation of the project setup and the purpose of each file in the Hexbin Heatmap visualization project.

## Project Setup

The project is built using Vue.js 3 and uses Vite as the build tool and development server. The main visualization is created using D3.js.

### Directory Structure

```
project-root/
├── public/
├── src/
│   ├── components/
│   │   ├── HexbinHeatmap.vue
│   │   └── ColorLegend.vue
│   ├── composables/
│   │   └── useHexbinVisualization.js
│   ├── utils/
│   │   └── hexbinUtils.js
│   ├── App.vue
│   ├── main.js
│   └── config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## File Descriptions

### Root Directory

- **index.html**: The main HTML file that serves as the entry point for the application.
- **package.json**: Defines the project dependencies and scripts.
- **vite.config.js**: Configuration file for Vite, specifying build and development settings.
- **README.md**: Provides an overview of the project, its features, and how to use it.

### src Directory

#### components/

- **HexbinHeatmap.vue**:
  - The main component that renders the entire hexbin heatmap visualization.
  - Manages the layout of the heatmap and color legend.
  - Handles the integration between the hexbin visualization and the color legend.

- **ColorLegend.vue**:
  - Renders the interactive color legend.
  - Manages the state of active colors and emits events when colors are toggled.

#### composables/

- **useHexbinVisualization.js**:
  - A composable function that encapsulates the D3.js logic for creating the hexbin visualization.
  - Handles the creation of SVG elements, data binding, and rendering of hexagons.
  - Applies the color scale to the hexbins based on data density.

#### utils/

- **hexbinUtils.js**:
  - Contains utility functions used across the project.
  - Includes functions for generating random data and creating the color scale.

#### Root of src/

- **App.vue**:
  - The root Vue component that serves as the main container for the application.
  - Imports and renders the HexbinHeatmap component.

- **main.js**:
  - The entry point for the Vue application.
  - Creates the Vue app instance and mounts it to the DOM.

- **config.js**:
  - Contains configuration settings for the hexbin heatmap visualization.
  - Defines color scales, dimensions, margins, and other customizable parameters.

## Key Interactions

1. **main.js** initializes the Vue application and renders **App.vue**.
2. **App.vue** includes the **HexbinHeatmap** component.
3. **HexbinHeatmap.vue** uses the **useHexbinVisualization** composable to create the hexbin visualization.
4. **HexbinHeatmap.vue** also includes the **ColorLegend** component for user interaction.
5. Both **HexbinHeatmap.vue** and **useHexbinVisualization.js** use utilities from **hexbinUtils.js**.
6. All components and functions refer to **config.js** for visualization parameters.

## Customization

To customize the visualization:

1. Modify **config.js** to adjust colors, dimensions, or hexbin parameters.
2. Update **hexbinUtils.js** to change data generation or color scaling logic.
3. Modify **HexbinHeatmap.vue** or **ColorLegend.vue** to adjust the layout or interaction behavior.

## Development Workflow

1. Run `npm install` to install dependencies.
2. Use `npm run dev` to start the Vite development server.
3. Make changes to the components, composables, or utilities as needed.
4. The changes will be hot-reloaded in the browser for immediate feedback.

This structure allows for a clear separation of concerns, making the project modular and easy to maintain. The use of composables (like `useHexbinVisualization.js`) allows for reusable D3.js logic that can be easily integrated into Vue components.
