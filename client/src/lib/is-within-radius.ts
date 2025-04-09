type Point = { longitude: number; latitude: number };
export default function isWithinRadius(
  point1: Point,
  point2: Point,
  radius: number = 25
) {
  // Radius of the Earth in kilometers
  const R = 6371;

  // Convert degrees to radians
  const lat1 = (point1.latitude * Math.PI) / 180;
  const lon1 = (point1.longitude * Math.PI) / 180;
  const lat2 = (point2.latitude * Math.PI) / 180;
  const lon2 = (point2.longitude * Math.PI) / 180;

  // Haversine formula
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;
  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = R * c;

  // Return whether the distance is within 25 km
  return distance <= radius;
}
