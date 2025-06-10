import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import useSkipData from './hooks/useSkipData';

/**
 * TypeScript interface for Skip data
 * Defines the structure of a skip object with all required properties
 */
interface Skip {
  id: string;
  size: number;
  name: string;
  price: number;
  description: string;
  hirePeriod: string;
  restrictions?: string[];
}

/**
 * Main App component for the Skip Size Selection application
 * Handles the selection of skips and confirmation flow
 */
const App: React.FC = () => {
  // State for tracking the selected skip and view mode
  const [selectedSkipId, setSelectedSkipId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  // Ref for the main content area (for skip to content functionality)
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Fetch skip data from API
  const { skips, loading, error, location, postcode } = useSkipData('NR32', 'Lowestoft');
  
  // Effect to handle focus management when switching views
  useEffect(() => {
    if (showConfirmation && mainContentRef.current) {
      // Set focus to the main content when showing confirmation
      mainContentRef.current.focus();
    }
  }, [showConfirmation]);
  
  // Fallback skip data in case API fails
  const fallbackSkips: Skip[] = [
    {
      id: '1',
      size: 4,
      name: '4 Yard Skip',
      price: 211,
      description: 'Ideal for small home projects',
      hirePeriod: '14 day hire period',
      restrictions: []
    },
    {
      id: '2',
      size: 5,
      name: '5 Yard Skip',
      price: 241,
      description: 'Perfect for medium-sized projects',
      hirePeriod: '14 day hire period',
      restrictions: []
    },
    {
      id: '3',
      size: 6,
      name: '6 Yard Skip',
      price: 264,
      description: 'Great for home renovations',
      hirePeriod: '14 day hire period',
      restrictions: []
    },
    {
      id: '4',
      size: 8,
      name: '8 Yard Skip',
      price: 295,
      description: 'Suitable for larger projects',
      hirePeriod: '14 day hire period',
      restrictions: []
    },
    {
      id: '5',
      size: 10,
      name: '10 Yard Skip',
      price: 356,
      description: 'For commercial use',
      hirePeriod: '14 day hire period',
      restrictions: ['Not Allowed On The Road']
    },
    {
      id: '6',
      size: 12,
      name: '12 Yard Skip',
      price: 390,
      description: 'For large commercial projects',
      hirePeriod: '14 day hire period',
      restrictions: ['Not Allowed On The Road']
    },
    {
      id: '7',
      size: 14,
      name: '14 Yard Skip',
      price: 434,
      description: 'For industrial use',
      hirePeriod: '14 day hire period',
      restrictions: ['Not Allowed On The Road']
    }
  ];
  
  /**
   * Handles the selection of a skip
   * @param skipId - The ID of the selected skip
   */
  const handleSkipSelect = (skipId: string) => {
    setSelectedSkipId(skipId);
    // Announce selection to screen readers
    const skipData = skips && skips.length > 0 ? skips : fallbackSkips;
    const selectedSkipName = skipData.find(skip => skip.id === skipId)?.name;
    const announcement = document.getElementById('a11y-announcement');
    if (announcement && selectedSkipName) {
      announcement.textContent = `${selectedSkipName} selected`;
    }
  };
  
  /**
   * Handles the continue button click to proceed to confirmation
   */
  const handleContinue = () => {
    if (selectedSkipId) {
      setShowConfirmation(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  /**
   * Handles the back button click to return to selection
   */
  const handleBack = () => {
    setShowConfirmation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  /**
   * Handles keyboard navigation for skip cards
   * @param e - Keyboard event
   * @param skipId - The ID of the skip card
   */
  const handleKeyDown = (e: React.KeyboardEvent, skipId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSkipSelect(skipId);
    }
  };
  
  // Use API data if available, otherwise use fallback data
  const skipData = skips && skips.length > 0 ? skips : fallbackSkips;
  
  // Get the currently selected skip object
  const selectedSkip = skipData.find(skip => skip.id === selectedSkipId);
  
  return (
    <div className="app-container">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      {/* Accessibility announcement region for screen readers */}
      <div 
        id="a11y-announcement" 
        className="visually-hidden" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
      
      {/* Navigation bar with progress steps */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-content">
          <div className="nav-top">
            <div className="logo">SkipSelect</div>
          </div>
          
          {/* Progress indicator */}
          <div className="progress-container" role="navigation" aria-label="Progress steps">
            <div className="progress-steps">
              <div 
                className={`step ${!showConfirmation ? 'active' : 'completed'}`}
                aria-current={!showConfirmation ? "step" : undefined}
              >
                <div 
                  className="step-circle" 
                  aria-hidden="true"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                    <path d="M15 18H9"></path>
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                    <circle cx="17" cy="18" r="2"></circle>
                    <circle cx="7" cy="18" r="2"></circle>
                  </svg>
                </div>
                <span className="step-label">
                  Select Skip
                  {!showConfirmation && <span className="visually-hidden">(current step)</span>}
                  {showConfirmation && <span className="visually-hidden">(completed)</span>}
                </span>
              </div>
              
              <div 
                className={`step ${showConfirmation ? 'active' : ''}`}
                aria-current={showConfirmation ? "step" : undefined}
              >
                <div 
                  className="step-circle"
                  aria-hidden="true"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <path d="m9 14 2 2 4-4"></path>
                  </svg>
                </div>
                <span className="step-label">
                  Confirm Details
                  {showConfirmation && <span className="visually-hidden">(current step)</span>}
                </span>
              </div>
              
              <div className="step">
                <div 
                  className="step-circle"
                  aria-hidden="true"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                  </svg>
                </div>
                <span className="step-label">Choose Date</span>
              </div>
              
              <div className="step">
                <div 
                  className="step-circle"
                  aria-hidden="true"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                </div>
                <span className="step-label">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {!showConfirmation ? (
        <main 
          id="main-content" 
          className="container" 
          ref={mainContentRef}
          tabIndex={-1}
        >
          <header className="header">
            <h1 className="title">Choose Your Skip Size</h1>
            <p className="subtitle">Select the skip size that best suits your needs for your waste removal project</p>
            
            <div className="location-info" aria-label="Service location">
              <div className="location-icon" aria-hidden="true">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  focusable="false"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <span className="location-text">{location || 'Lowestoft'} ({postcode || 'NR32'})</span>
            </div>
          </header>
          
          {/* Loading state */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading skip options...</p>
            </div>
          )}
          
          {/* Error state */}
          {error && !loading && (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <p>Using fallback data instead.</p>
            </div>
          )}
          
          {/* Skip selection grid */}
          <div 
            className="skip-grid" 
            role="radiogroup" 
            aria-label="Available skip sizes"
          >
            {skipData.map(skip => (
              <div 
                key={skip.id}
                className={`skip-card ${selectedSkipId === skip.id ? 'selected' : ''}`}
                onClick={() => handleSkipSelect(skip.id)}
                onKeyDown={(e) => handleKeyDown(e, skip.id)}
                tabIndex={0}
                role="radio"
                aria-checked={selectedSkipId === skip.id}
                aria-label={`${skip.name}, ${skip.size} yards, £${skip.price}, ${skip.hirePeriod}${skip.restrictions && skip.restrictions.length > 0 ? `, Restrictions: ${skip.restrictions.join(', ')}` : ''}`}
              >
                <div className="image-container">
                  <div className="skip-image" aria-hidden="true">
                    {skip.size} Yards
                  </div>
                  <div className="size-tag" aria-hidden="true">{skip.size} Yards</div>
                  
                  {skip.restrictions && skip.restrictions.length > 0 && (
                    <div className="restriction-tag" aria-hidden="true">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        focusable="false"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      {skip.restrictions[0]}
                    </div>
                  )}
                </div>
                
                <h3 className="skip-title">{skip.name}</h3>
                <p className="skip-description">{skip.hirePeriod}</p>
                <div className="skip-price">£{skip.price}</div>
                
                <button 
                  className={`select-button ${selectedSkipId === skip.id ? 'selected' : ''}`}
                  aria-hidden="true" 
                  tabIndex={-1}
                >
                  <span>{selectedSkipId === skip.id ? 'Selected' : 'Select This Skip'}</span>
                  {selectedSkipId !== skip.id && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      focusable="false"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
          
          {/* Continue button */}
          <button 
            className="continue-button"
            onClick={handleContinue}
            disabled={!selectedSkipId}
            aria-disabled={!selectedSkipId}
          >
            Continue to Next Step
          </button>
        </main>
      ) : (
        <main 
          id="main-content" 
          className="confirmation-container" 
          ref={mainContentRef}
          tabIndex={-1}
          aria-labelledby="confirmation-title"
        >
          <h2 id="confirmation-title" className="confirmation-title">Confirm Your Selection</h2>
          
          {selectedSkip && (
            <div className="skip-details" aria-label="Selected skip details">
              <div className="detail-row">
                <span className="detail-label">Skip Size:</span>
                <span className="detail-value">{selectedSkip.size} Yards</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Skip Name:</span>
                <span className="detail-value">{selectedSkip.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Hire Period:</span>
                <span className="detail-value">{selectedSkip.hirePeriod}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Price:</span>
                <span className="detail-value">£{selectedSkip.price}</span>
              </div>
              {selectedSkip.restrictions && selectedSkip.restrictions.length > 0 && (
                <div className="detail-row">
                  <span className="detail-label">Restrictions:</span>
                  <span className="detail-value">{selectedSkip.restrictions.join(', ')}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="button-group">
            <button 
              className="back-button" 
              onClick={handleBack}
              aria-label="Go back to skip selection"
            >
              Back
            </button>
            <button 
              className="continue-button"
              aria-label="Continue to choose delivery date"
            >
              Continue to Choose Date
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
