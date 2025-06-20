/**
 * Calculates the approximate distance between two geographical coordinates using the Haversine formula.
 * @param {string|number[]} location1 - First location in format 'latitude,longitude' or [latitude, longitude]
 * @param {string|number[]} location2 - Second location in format 'latitude,longitude' or [latitude, longitude]
 * @returns {number} Distance in kilometers
 * @throws {Error} If the input format is invalid
 */
export function calculateDistance(location1, location2) {
    // Parse locations if they're strings
    const [lat1, lon1] = parseLocation(location1);
    const [lat2, lon2] = parseLocation(location2);

    // Convert latitude and longitude to radians
    const lat1Radians = toRadians(lat1);
    const lat2Radians = toRadians(lat2);
    const latitudeDiff = toRadians(lat2 - lat1);
    const longitudeDiff = toRadians(lon2 - lon1);

    // Haversine formula
    const haversineTerm = Math.sin(latitudeDiff/2) * Math.sin(latitudeDiff/2) +
                         Math.cos(lat1Radians) * Math.cos(lat2Radians) *
                         Math.sin(longitudeDiff/2) * Math.sin(longitudeDiff/2);
    const angularDistance = 2 * Math.atan2(Math.sqrt(haversineTerm), Math.sqrt(1-haversineTerm));
    // Earth's radius in kilometers
    const R = 6371;
    
    return R * angularDistance;
}

/**
 * Converts degrees to radians
 * @param {number} degrees 
 * @returns {number}
 */
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Parses location input into [latitude, longitude] array
 * @param {string|number[]} location 
 * @returns {number[]}
 * @throws {Error} If the input format is invalid
 */
function parseLocation(location) {
    // Handle array input
    if (Array.isArray(location) && location.length === 2 &&
        typeof location[0] === 'number' && typeof location[1] === 'number') {
        // Validate latitude range (-90 to 90)
        if (location[0] < -90 || location[0] > 90) {
            throw new Error('Invalid latitude. Must be between -90 and 90 degrees');
        }
        // Validate longitude range (-180 to 180)
        if (location[1] < -180 || location[1] > 180) {
            throw new Error('Invalid longitude. Must be between -180 and 180 degrees');
        }
        return location;
    }
    
    // Handle string input
    if (typeof location === 'string') {
        // Allow optional space after comma and handle both integer and decimal numbers
        const match = location.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
        if (match) {
            const lat = parseFloat(match[1]);
            const lon = parseFloat(match[2]);
            
            // Validate latitude range
            if (lat < -90 || lat > 90) {
                throw new Error('Invalid latitude. Must be between -90 and 90 degrees');
            }
            // Validate longitude range
            if (lon < -180 || lon > 180) {
                throw new Error('Invalid longitude. Must be between -180 and 180 degrees');
            }
            
            return [lat, lon];
        }
    }
    
    throw new Error('Invalid location format. Use "latitude,longitude" string or [latitude, longitude] array');
}


// Example 1: Using string format
// console.log(calculateDistance("22.652516, 88.440410", "22.7319232, 88.4990986")); // Airport to University
// // Example 2: Using array format
// console.log(calculateDistance([22.652516, 88.440410], [22.7319232, 88.4990986])); // Airport to University

// https://www.google.com/maps/dir/lat1,lon1/lat2,lon2
// https://www.google.com/maps/dir/22.652516,88.440410/22.7319232,88.4990986