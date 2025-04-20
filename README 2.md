# CloseTo.me App

A location-based application to help users find nearby places.

## Setup Instructions

1. Navigate to the project directory:
   ```
   cd closetome-app-complete
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Features

- **Interactive Map**: Real Leaflet map with markers for each location
- **Place Selection**: Click on a place in the list to highlight it on the map
- **Category Filtering**: Filter places by type (All, Restaurants, Cafes, Stores)
- **Search Functionality**: Search for places by name or address

## Project Structure

```
closetome-app-complete/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── PlacesList.js
│   │   └── Map.js
│   ├── App.js
│   ├── index.css
│   └── index.js
└── package.json
```

## How It Works

1. The app maintains state for:
   - Search query
   - Selected category
   - Selected place

2. When you select a place from the list:
   - The map centers on that location
   - The marker is highlighted
   - The place card is highlighted in the list

3. When you filter by category:
   - Only places matching that category are shown

4. When you search:
   - Places matching the search query are filtered
   - Results update in real-time as you type
