# Skip Size Selector

A modern, responsive React application for selecting skip sizes for waste management services. This project is a redesign of the skip selection page from wewantwaste.co.uk with improved UI/UX and full responsiveness.


## Features

- Modern UI with card-based design and animations
- Fully responsive layout for mobile, tablet, and desktop
- Real-time API data fetching with error handling
- Interactive skip selection with visual feedback
- Progress indicator for multi-step process
- Confirmation screen with order details
- Comprehensive accessibility features
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Print-friendly styles

## Tech Stack

- React 18
- TypeScript
- CSS Modules for styling
- Axios for API requests
- Vite for build tooling

## Project Structure

```
src/
├── components/     # React components
│   ├── SkipCard.tsx       # Individual skip option card
│   └── SkipSelector.tsx   # Main component for skip selection
├── hooks/          # Custom React hooks
│   └── useSkipData.ts     # Hook for API data fetching
├── types/          # TypeScript type definitions
│   └── Skip.ts            # Skip data interfaces
├── App.tsx   # Main application component
├── App.css   # Styles for the application
├── index.css   # Global styles
└── main.tsx        # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/dohrisalim/skip-selector.git
   cd skip-selector
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:12000

## Build for Production

```
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Design Approach

The design focuses on a clean, modern aesthetic with a card-based layout that works well across all device sizes. Key design elements include:

- CSS variables for consistent theming and easy customization
- Soft shadows and subtle animations for depth and interactivity
- Clear visual hierarchy with prominent size and price information
- Consistent spacing and typography
- Visual indicators for selection state
- Responsive grid layout that adapts to screen size
- Accessibility considerations for keyboard navigation and screen readers
- Animations that respect user preferences (respects reduced motion settings)
- Print-friendly styles for order confirmation

## Accessibility Features

The application is built with accessibility in mind:

- Semantic HTML structure
- ARIA attributes for enhanced screen reader support
- Keyboard navigation for all interactive elements
- Focus management between views
- Skip to content link for keyboard users
- High contrast mode support
- Appropriate color contrast ratios
- Visible focus indicators
- Screen reader announcements for dynamic content
- Reduced motion support

## API Integration

The application fetches skip data from the wewantwaste.co.uk API and includes:

- Loading states
- Error handling with fallback data
- Type-safe data handling with TypeScript interfaces
- Retry mechanisms for failed requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Future Enhancements

- Add filtering options for skip types
- Add date selection calendar
- Add animations for smoother transitions between steps
- Implement dark mode
- Add localization support
- Implement offline support with service workers
