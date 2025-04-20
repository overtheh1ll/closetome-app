import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PlacesList from './components/PlacesList';
import Map from './components/Map';
import CategoryButtons from './components/CategoryButtons';
import './index.css';

// Mock data for places
const mockData = [
  {
    id: 1,
    name: 'Whole Foods Market',
    address: '399 4th St',
    rating: 4.2,
    reviewCount: 238,
    priceLevel: '$$',
    hours: 'Open until 10:00 PM',
    distance: 0.3,
    tags: ['health', 'food', 'organic', 'grocery'],
    lat: 37.782,
    lng: -122.396,
  },
  {
    id: 2,
    name: 'Vitality Bowls',
    address: '270 5th St',
    rating: 4.5,
    reviewCount: 156,
    priceLevel: '$$',
    hours: 'Open until 8:00 PM',
    distance: 0.4,
    tags: ['health', 'food', 'acai', 'smoothies'],
    lat: 37.781,
    lng: -122.398,
  },
  {
    id: 3,
    name: 'Sweetgreen',
    address: '171 2nd St',
    rating: 4.7,
    reviewCount: 412,
    priceLevel: '$$',
    hours: 'Open until 9:00 PM',
    distance: 0.5,
    tags: ['health', 'food', 'salad', 'organic'],
    lat: 37.787,
    lng: -122.399,
  },
  {
    id: 4,
    name: 'Project Juice',
    address: '525 Market St',
    rating: 4.3,
    reviewCount: 98,
    priceLevel: '$$',
    hours: 'Open until 7:00 PM',
    distance: 0.2,
    tags: ['health', 'food', 'juice', 'smoothies'],
    lat: 37.789,
    lng: -122.401,
  },
  {
    id: 5,
    name: 'Pressed Juicery',
    address: '301 Mission St',
    rating: 4.1,
    reviewCount: 187,
    priceLevel: '$$',
    hours: 'Open until 8:00 PM',
    distance: 0.6,
    tags: ['health', 'food', 'juice', 'cleanse'],
    lat: 37.791,
    lng: -122.397,
  },
  {
    id: 6,
    name: "Trader Joe's",
    address: '555 9th St',
    rating: 4.6,
    reviewCount: 892,
    priceLevel: '$',
    hours: 'Open until 9:00 PM',
    distance: 0.8,
    tags: ['grocery', 'food', 'organic', 'health'],
    lat: 37.770,
    lng: -122.411,
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [compactLayout, setCompactLayout] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState(mockData);
  const [activeCategory, setActiveCategory] = useState('All');

  // Get user location on app load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  // Get search query from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, []);

  // Filter places based on search query and category
  useEffect(() => {
    let filtered = mockData;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(place =>
        place.name.toLowerCase().includes(query) ||
        place.tags.some(tag => tag.toLowerCase().includes(query)) ||
        place.address.toLowerCase().includes(query)
      );
    }

    if (activeCategory !== 'All') {
      filtered = filtered.filter(place =>
        place.tags.includes(activeCategory.toLowerCase())
      );
    }

    setFilteredPlaces(filtered);
  }, [searchQuery, activeCategory]);

  const handleSelectPlace = (placeId) => {
    setSelectedPlace(placeId);
  };

  const handleHoverPlace = (placeId) => {
    setHoveredPlace(placeId);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const url = new URL(window.location);
    url.searchParams.set('q', e.target.value);
    window.history.pushState({}, '', url);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const toggleCompactLayout = () => {
    setCompactLayout(!compactLayout);
    document.body.classList.toggle('compact-layout');
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''} ${compactLayout ? 'compact-layout' : ''}`}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        compactLayout={compactLayout}
        onToggleCompactLayout={toggleCompactLayout}
      />

      <div className="main-content">
        <div className="sidebar">
          <div className="ad-container top-ad">
            <div className="ad-placeholder">
              <span>ADVERTISEMENT</span>
              <span>728px × 90px</span>
            </div>
          </div>

          <CategoryButtons
            categories={['All', 'Restaurants', 'Cafes', 'Stores']}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <PlacesList
            places={filteredPlaces}
            onSelectPlace={handleSelectPlace}
            selectedPlace={selectedPlace}
            onHoverPlace={handleHoverPlace}
          />
        </div>

        <div className="map-section">
          <Map
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={handleSelectPlace}
            hoveredPlace={hoveredPlace}
            userLocation={userLocation}
          />

          <div className="ad-container side-ad">
            <div className="ad-placeholder">
              <span>ADVERTISEMENT</span>
              <span>160px × 600px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;