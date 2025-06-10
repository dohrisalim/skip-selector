import { useState, useEffect } from 'react';
import axios from 'axios';
import { Skip, SkipResponse } from '../types/Skip';

/**
 * Return type for the useSkipData hook
 */
interface UseSkipDataReturn {
  /** Array of available skips */
  skips: Skip[];
  
  /** Loading state indicator */
  loading: boolean;
  
  /** Error message if fetch failed */
  error: string | null;
  
  /** Location name from API response */
  location: string;
  
  /** Postcode from API response */
  postcode: string;
}

/**
 * Custom hook for fetching skip data from the API
 * 
 * @param postcode - The postcode to fetch skips for
 * @param area - The area name
 * @returns Object containing loading state, error state, skip data, location and postcode
 */
const useSkipData = (postcode: string, area: string): UseSkipDataReturn => {
  // State for storing skip data and request status
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>(area || '');
  const [postcodeState, setPostcodeState] = useState<string>(postcode || '');

  // Effect to fetch data on component mount
  useEffect(() => {
    const fetchSkips = async () => {
      // Reset states
      setLoading(true);
      setError(null);
      
      try {
        // Make API request with timeout and error handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        try {
          // Try direct fetch first
          const apiUrl = `/api/skips/by-location?postcode=${encodeURIComponent(postcode)}&area=${encodeURIComponent(area)}`;
          
          console.log('Attempting to fetch from:', apiUrl);
          
          const response = await axios.get<SkipResponse | Skip[]>(
            apiUrl,
            { 
              signal: controller.signal,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              validateStatus: () => true
            }
          );
          
          clearTimeout(timeoutId);
          
          console.log('API Response:', {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data
          });
          
          // Handle API response
          if (response.status === 200 && response.data) {
            let skipData: any[] = [];
            let locationData = area;
            let postcodeData = postcode;
            
            // Check if the response data is an array (direct skips array)
            if (Array.isArray(response.data)) {
              skipData = response.data;
            } 
            // Handle case where skips are in a skips property (for backward compatibility)
            else if ('skips' in response.data && Array.isArray(response.data.skips)) {
              skipData = response.data.skips;
              locationData = response.data.location || area;
              postcodeData = response.data.postcode || postcode;
            }
            
            if (skipData.length > 0) {
              // Map the API data to our Skip interface
              const mappedSkips = skipData.map((skip: any): Skip => ({
                id: skip.id,
                size: skip.size,
                name: skip.name || `${skip.size} Yard Skip`,
                price_before_vat: skip.price_before_vat ?? skip.price ?? 0,
                price: skip.price ?? skip.price_before_vat ?? 0, // Keep for backward compatibility
                description: skip.description || '',
                imageUrl: skip.imageUrl || '',
                hirePeriod: skip.hirePeriod || '14 day hire period',
                allowed_on_road: Boolean(skip.allowed_on_road),
                allows_heavy_waste: Boolean(skip.allows_heavy_waste),
                per_tonne_cost: skip.per_tonne_cost ?? 0,
                transport_cost: skip.transport_cost ?? 0,
                restrictions: Array.isArray(skip.restrictions) ? skip.restrictions : []
              }));
              
              setSkips(mappedSkips);
              setLocation(locationData);
              setPostcodeState(postcodeData);
              setLoading(false);
              return;
            } else {
              console.warn('API returned empty skips array');
              setError('No skip data available');
            }
          } else {
            setError(`API request failed with status: ${response.status}`);
            console.error('API request failed:', response.status, response.statusText);
          }
        } catch (err) {
          clearTimeout(timeoutId);
          if (axios.isAxiosError(err)) {
            const errorMessage = `Network error: ${err.message}`;
            setError(errorMessage);
            console.error('Network error:', errorMessage);
          } else {
            const errorMessage = 'An unexpected error occurred';
            setError(errorMessage);
            console.error('Unexpected error:', err);
          }
        }
      } catch (err) {
        const errorMessage = 'Failed to initialize request';
        setError(errorMessage);
        console.error('Failed to initialize request:', err);
      } finally {
        setLoading(false);
      }
    };

    // Execute the fetch function
    fetchSkips();
  }, [postcode, area]); // Dependencies for the effect

  // Return the hook data
  return { skips, loading, error, location, postcode: postcodeState };
};

export default useSkipData;