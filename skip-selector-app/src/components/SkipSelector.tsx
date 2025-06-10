import React, { useState } from 'react';
import styled from 'styled-components';
import SkipCard from './SkipCard';
import useSkipData from '../hooks/useSkipData';
import { Skip } from '../types/Skip';

// Placeholder image URLs
const placeholderImage = 'https://via.placeholder.com/400x300/3498db/ffffff?text=Skip+Image';

interface SkipSelectorProps {
  postcode?: string;
  area?: string;
  onSkipSelected?: (skip: Skip) => void;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LocationInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #f8f9fa;
  border-radius: 50px;
  width: fit-content;
  margin: 1rem auto;
`;

const LocationIcon = styled.div`
  color: #3498db;
`;

const LocationText = styled.span`
  font-weight: 500;
  color: #2c3e50;
`;

const SkipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #fff5f5;
  border-radius: 8px;
  color: #e53e3e;
  border: 1px solid #fed7d7;
`;

const ContinueButton = styled.button`
  display: block;
  margin: 4rem auto 0;
  padding: 1.25rem 2.5rem;
  background-color: #3498db;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 300px;
  text-align: center;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Fallback data in case API fails
const fallbackSkips: Skip[] = [
  {
    id: '1',
    size: 4,
    name: '4 Yard Skip',
    price_before_vat: 211,
    price: 211,
    description: 'Ideal for small home projects',
    imageUrl: placeholderImage,
    hirePeriod: '14 day hire period',
    allowed_on_road: true,
    allows_heavy_waste: true,
    per_tonne_cost: 120,
    transport_cost: 45,
    restrictions: []
  },
  {
    id: '2',
    size: 5,
    name: '5 Yard Skip',
    price_before_vat: 241,
    price: 241,
    description: 'Perfect for medium-sized projects',
    imageUrl: placeholderImage,
    hirePeriod: '14 day hire period',
    allowed_on_road: true,
    allows_heavy_waste: true,
    per_tonne_cost: 130,
    transport_cost: 50,
    restrictions: []
  },
  {
    id: '3',
    size: 6,
    name: '6 Yard Skip',
    price_before_vat: 264,
    price: 264,
    description: 'Great for home renovations',
    imageUrl: placeholderImage,
    hirePeriod: '14 day hire period',
    allowed_on_road: true,
    allows_heavy_waste: true,
    per_tonne_cost: 140,
    transport_cost: 55,
    restrictions: []
  },
  {
    id: '4',
    size: 8,
    name: '8 Yard Skip',
    price_before_vat: 295,
    price: 295,
    description: 'Suitable for larger projects',
    imageUrl: placeholderImage,
    hirePeriod: '14 day hire period',
    allowed_on_road: true,
    allows_heavy_waste: true,
    per_tonne_cost: 150,
    transport_cost: 60,
    restrictions: []
  },
  {
    id: '5',
    size: 10,
    name: '10 Yard Skip',
    price_before_vat: 356,
    price: 356,
    description: 'For commercial use',
    imageUrl: placeholderImage,
    hirePeriod: '14 day hire period',
    allowed_on_road: false,
    allows_heavy_waste: true,
    per_tonne_cost: 160,
    transport_cost: 70,
    restrictions: ['Not Allowed On The Road']
  },
  {
    id: '6',
    size: 12,
    name: '12 Yard Skip',
    price_before_vat: 390,
    price: 390,
    description: 'For large commercial projects',
    imageUrl: placeholderImage,
    hirePeriod: '14 day hire period',
    allowed_on_road: false,
    allows_heavy_waste: true,
    per_tonne_cost: 170,
    transport_cost: 80,
    restrictions: ['Not Allowed On The Road']
  },
  {
    id: '7',
    size: 14,
    name: '14 Yard Skip',
    price_before_vat: 434,
    price: 434,
    description: 'For industrial use',
    imageUrl: placeholderImage,
    hirePeriod: '14 day hire period',
    allowed_on_road: false,
    allows_heavy_waste: true,
    per_tonne_cost: 180,
    transport_cost: 90,
    restrictions: ['Not Allowed On The Road']
  }
];

const SkipSelector: React.FC<SkipSelectorProps> = ({ 
  postcode = 'NR32', 
  area = 'Lowestoft',
  onSkipSelected 
}) => {
  const { skips, loading, error, location } = useSkipData(postcode, area);
  const [selectedSkipId, setSelectedSkipId] = useState<string | null>(null);
  
  const handleSkipSelect = (skipId: string) => {
    setSelectedSkipId(skipId);
  };
  
  const handleContinue = () => {
    if (selectedSkipId) {
      const selectedSkip = skips.find(skip => skip.id === selectedSkipId) || 
                          fallbackSkips.find(skip => skip.id === selectedSkipId);
      
      if (selectedSkip && onSkipSelected) {
        onSkipSelected(selectedSkip);
      }
    }
  };
  
  // Use fallback data if API fails
  const displaySkips = skips.length > 0 ? skips : fallbackSkips;
  
  return (
    <Container>
      <Header>
        <Title>Choose Your Skip Size</Title>
        <Subtitle>Select the skip size that best suits your needs for your waste removal project</Subtitle>
        
        {location && (
          <LocationInfo>
            <LocationIcon>
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
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </LocationIcon>
            <LocationText>{location} ({postcode})</LocationText>
          </LocationInfo>
        )}
      </Header>
      
      {loading && skips.length === 0 ? (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      ) : (
        <>
          {error && (
            <ErrorMessage>
              {error}
              <p>Showing default skip options instead.</p>
            </ErrorMessage>
          )}
          <SkipGrid>
            {displaySkips.map(skip => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkipId === skip.id}
                onSelect={handleSkipSelect}
              />
            ))}
          </SkipGrid>
        </>
      )}
      
      <ContinueButton 
        onClick={handleContinue}
        disabled={!selectedSkipId}
      >
        Continue to Next Step
      </ContinueButton>
    </Container>
  );
};

export default SkipSelector;