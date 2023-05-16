import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Sostituisci con l'URL effettivo del tuo backend Laravel

export async function getAppartamenti(coordinate, raggio = 20) {
  try {
    const response = await axios.get(`${API_URL}/appartamenti`, {
      params: {
        lat: coordinate.lat,
        lon: coordinate.lon,
        raggio: raggio,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
