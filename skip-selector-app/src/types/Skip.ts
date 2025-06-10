/**
 * Interface representing a skip option
 */
export interface Skip {
  /** Unique identifier for the skip */
  id: string;
  
  /** Size of the skip in yards */
  size: number;
  
  /** Display name of the skip */
  name: string;
  
  /** Price in GBP before VAT */
  price_before_vat: number;
  
  /** Description of the skip */
  description: string;
  
  /** URL to the skip image (optional) */
  imageUrl?: string;
  
  /** Hire period description (e.g., "14 day hire period") */
  hirePeriod: string;
  
  /** Whether the skip is allowed on the road */
  allowed_on_road: boolean;
  
  /** Whether the skip allows heavy waste */
  allows_heavy_waste: boolean;
  
  /** Cost per tonne */
  per_tonne_cost: number;
  
  /** Transport cost */
  transport_cost: number;
  
  /** Optional array of restrictions for the skip */
  restrictions?: string[];
  
  /** Price in GBP (kept for backward compatibility) */
  price?: number;
}

/**
 * Interface for the API response when fetching skips
 */
export interface SkipResponse {
  /** Array of available skips */
  skips: Skip[];
  
  /** Location name */
  location: string;
  
  /** Postcode for the location */
  postcode: string;
  
  /** Optional error message */
  error?: string;
}