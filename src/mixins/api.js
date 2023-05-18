import axios from 'axios';

const API_URL = 'http://localhost:8000/api/apartments';


export async function getAppartamenti(coordinate, raggio) {
  try {
    const { lat, lon } = coordinate;
    const distance = raggio;

    const response = await axios.get(`${API_URL}/${lat}/${lon}/${distance}`);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
