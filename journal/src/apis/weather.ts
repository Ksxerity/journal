import axios from 'axios';
import { WeatherConditions } from '../types';

const apiUrlBase = 'http://localhost:5000/api';

export const getCurrentWeatherConditions = async (location: string): Promise<WeatherConditions> => {
  const apiUrl = `${apiUrlBase}/weather/${location}`;

  const response = await axios.get(apiUrl)
  return response.data;
}
