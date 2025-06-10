import React from 'react';
import styled from 'styled-components';
import { Skip } from '../types/Skip';

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Styled components
const Card = styled.div<{ isSelected: boolean }>`
  position: relative;
  background: white;
  border: 1px solid ${props => (props.isSelected ? '#4a90e2' : '#e2e8f0')};
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => 
    props.isSelected 
      ? '0 4px 6px rgba(74, 144, 226, 0.2)' 
      : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const SkipImage = styled.div`
  width: 100%;
  height: 140px;
  background-color: #f0f4f8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 1rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SizeTag = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
`;

const RestrictionTag = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: rgba(255, 165, 0, 0.9);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  z-index: 1;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const Title = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #2d3748;
  line-height: 1.3;
`;

const Description = styled.div`
  color: #4a5568;
  font-size: 0.9375rem;
  margin: 0.75rem 0 1.25rem;
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.4;
`;

const InfoIcon = styled.span`
  color: #4a90e2;
  display: flex;
  align-items: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Price = styled.div`
  font-size: 1.625rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0.75rem 0 1.25rem;
  
  small {
    font-size: 0.75em;
    font-weight: 500;
    color: #718096;
    margin-left: 0.25em;
  }
`;

const SelectButton = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 0.875rem 1rem;
  background-color: ${props => (props.isSelected ? '#38a169' : '#4a90e2')};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => (props.isSelected ? '#2f855a' : '#3182ce')};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skipId: string) => void;
}



const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  return (
    <Card 
      isSelected={isSelected}
      onClick={() => onSelect(skip.id)}
      data-testid={`skip-card-${skip.id}`}
    >
      <ImageContainer>
        <SkipImage>
          {skip.size} Yard
        </SkipImage>
        <SizeTag>{skip.size} Yard</SizeTag>
        
        {skip.restrictions && skip.restrictions.length > 0 && (
          <RestrictionTag>
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
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            {skip.restrictions[0]}
          </RestrictionTag>
        )}
      </ImageContainer>
      
      <Title>{skip.size} Yard Skip</Title>
      
      <Description>
        <InfoItem>
          <InfoIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
          </InfoIcon>
          {skip.hirePeriod}
        </InfoItem>
        
        <InfoItem>
          <InfoIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8.5V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2.5"></path>
              <path d="M5 12h14"></path>
              <path d="m8 16 3-3-3-3"></path>
            </svg>
          </InfoIcon>
          {skip.allowed_on_road ? 'Allowed on road' : 'Not allowed on road'}
        </InfoItem>
        
        <InfoItem>
          <InfoIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8.5V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2.5"></path>
              <path d="M5 12h14"></path>
              <path d="m8 16 3-3-3-3"></path>
            </svg>
          </InfoIcon>
          {skip.allows_heavy_waste ? 'Heavy waste allowed' : 'No heavy waste'}
        </InfoItem>
        
        {skip.per_tonne_cost > 0 && (
          <InfoItem>
            <InfoIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </InfoIcon>
            {formatCurrency(skip.per_tonne_cost)}/tonne
          </InfoItem>
        )}
        
        {skip.transport_cost > 0 && (
          <InfoItem>
            <InfoIcon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"></path>
                <path d="M19 18h2c.6 0 1-.4 1-1v-3.7c0-.8-.5-1.5-1.2-1.8l-6-2.3c-.5-.2-1.1-.2-1.7 0l-6 2.3c-.6.3-1.1 1-1.1 1.8V17c0 .6.4 1 1 1h2"></path>
                <circle cx="7" cy="18" r="2"></circle>
                <path d="M9 18h6"></path>
                <circle cx="17" cy="18" r="2"></circle>
              </svg>
            </InfoIcon>
            {formatCurrency(skip.transport_cost)} transport
          </InfoItem>
        )}
      </Description>
      
      <Price>{formatCurrency(skip.price_before_vat)}</Price>
      
      <SelectButton isSelected={isSelected}>
        <span>{isSelected ? 'Selected' : 'Select This Skip'}</span>
        {!isSelected && (
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
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        )}
      </SelectButton>
    </Card>
  );
};

export default SkipCard;