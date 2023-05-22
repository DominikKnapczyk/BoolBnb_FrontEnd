// Converte gradi in radianti
export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Calcola la distanza tra due coordinate geografiche utilizzando la formula dell'emisenoverso
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Raggio approssimativo della Terra in chilometri

  // Converte le coordinate in radianti
  const lat1Rad = degreesToRadians(lat1);
  const lon1Rad = degreesToRadians(lon1);
  const lat2Rad = degreesToRadians(lat2);
  const lon2Rad = degreesToRadians(lon2);

  // Calcola la differenza tra le latitudini e longitudini
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  // Calcola la distanza utilizzando la formula dell'emisenoverso
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}
