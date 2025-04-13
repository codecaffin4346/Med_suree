/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents location information, including city and region.
 */
export interface LocationInformation {
  /**
   * The city of the location.
   */
  city: string;
  /**
   * The region of the location.
   */
  region: string;
}

/**
 * Asynchronously retrieves location information for a given location.
 * Note: Use https://www.geoapify.com/geocoding/reverse-geocoding for reverse geocoding
 *
 * @param location The location for which to retrieve location information.
 * @returns A promise that resolves to a LocationInformation object containing city and region.
 */
export async function getLocationInformation(location: Location): Promise<LocationInformation> {
  return {
    city: 'New York',
    region: 'New York',
  };
}
