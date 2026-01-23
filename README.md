# ParkMarks
A modern, interactive React web app for tracking and exploring US national parks. This project visualizes national parks on an interactive map, lets you browse a searchable list, and opens detailed park cards.

## Website
- https://dw1209.github.io/ParkMarks/

## Features
- **Interactive US Map**
  - Hover a state to highlight it and show the state name badge
  - Click a national park marker to open details
- **Park Details Panel**
  - Park image, description, state, established date
  - Visited / wishlist status
  - Visit dates (supports multiple dates) and personal rating (stars)
- **Park List Panel**
  - Quick open/close list
  - Search by park name/state
  - Filter: All / Visited / Wishlist
- **Progress Dashboard**
  - Shows visited count and overall completion percentage
- **Responsive UI**
  - Desktop: persistent sidebar
  - Mobile/tablet: bottom-sheet style detail panel
  - Mobile landscape: layout adjustments for overlays/tooltips
- **Shareable URL state**
  - Deep-link via `?park=<slug-or-id>` and supports back/forward navigation
- **Hint Tooltip**
  - Guides users on how to interact with the map
  - Remembers open/close state during a session (sessionStorage)

## Tech Stack
- Vite: `^7.2.4`
- React: `^19.2.0`
- React DOM: `^19.2.0`
- Icons: `lucide-react ^0.562.0`
- ESLint (flat config) with React Hooks + React Refresh plugins

## Project Structure
```
├── public/
│   ├── images/                     # Park images and assets
│   └── mountain.png                # Tab icon
├── src/
│   ├── components/
│   │   ├── BackgroundPattern.jsx   # Background decoration
│   │   ├── Header.jsx              # Application header
│   │   ├── HintTooltip.jsx         # Interactive hints
│   │   ├── ParkListPanel.jsx       # Park list display
│   │   ├── ParkSidebar.jsx         # Sidebar navigation
│   │   ├── RatingStars.jsx         # Star rating component
│   │   └── USMap.jsx               # Interactive US map
│   ├── data/
│   │   ├── parks.js                # National parks dataset
│   │   └── usStates.js             # US states data
│   ├── utils/
│   │   ├── formatEstablished.js    # Date formatting
│   │   ├── projection.js           # Coordinate projection (lat/lon to map)
│   │   └── slug.js                 # URL slug generation
│   ├── main.jsx                    # React entry point
│   ├── App.jsx                     # Root application component
│   └── index.css                   # Global styles
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
└── eslint.config.js                # ESLint configuration
```

## Getting Started
### Prerequisites
- Node.js: `20.19+`
- npm package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/DW1209/ParkMarks.git
cd ParkMarks
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`

## Available Scripts
- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Key Features
### Interactive Map
The application features an interactive SVG map of the United States. Users can:
- Hover over states to see state names
- Hover over park markers to highlight them
- Click on parks to view detailed information
- See which parks have been visited with visual indicators

### URL-Based State Management
The application uses URL parameters to:
- Enable shareable park links
- Persist park selection through browser navigation
- Support back/forward button functionality
- Enable deep linking to specific parks

### Responsive Layout
The interface adapts to different screen sizes:
- Desktop: Full-featured interface with side panels
- Tablet: Optimized touch interactions
- Mobile: Compact layout with collapsible sections
- Landscape mode: Special adjustments for horizontal orientation

## Data Customization
Users can edit the parks dataset in `src/data/parks.js` to update:
- Visited status, dates, rating
- Descriptions and images
- Coordinates used for markers

## Data Structure
Each park in `src/data/parks.js` is stored with the following information:
- **id**: Unique identifier
- **name**: Common name
- **fullName**: Official park name
- **state**: Location state(s)
- **lat/lon**: Geographic coordinates
- **established**: Founding date
- **visited**: Boolean flag for visit status
- **dates**: Array of visit dates
- **rating**: Star rating (1-5)
- **image**: Path to park image
- **desc**: Park description

## Browser Support
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements
Potential features for future versions:
- Photo gallery for each park
- Advanced filtering and search
- Dark mode support

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Data Attribution
- Park coordinates and information are derived from public National Parks datasets
- SVG map provides accurate geographic representation of US states

