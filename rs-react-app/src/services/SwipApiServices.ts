import axios from 'axios';
import { IPeople, IPeoples } from '../types/resultAPI.interface';

const api = axios.create({
  baseURL: 'https://swapi.dev/api/'
});


export const SwapiApiServices = {
  get: async (endpoint: string): Promise<IPeoples> => {
    try {
      const response = await api.get(endpoint);
      return {
        ...response.data,
        results: response.data.results.map((item: IPeople) => ({
          name: item.name,
          height: item.height,
          mass: item.mass,
          hair_color: item.hair_color,
          skin_color: item.skin_color,
          eye_color: item.eye_color,
          birth_year: item.birth_year,
          gender: item.gender,
        })),
      };
    } catch (error) {
      throw new Error('Bad request')
    }
  },
  getPeopleById: async (id: number): Promise<IPeople> => {
    try {
      const response = await api.get(`people/${id}`);
      const item = response.data
      return {
        name: item.name,
        height: item.height,
        mass: item.mass,
        hair_color: item.hair_color,
        skin_color: item.skin_color,
        eye_color: item.eye_color,
        birth_year: item.birth_year,
        gender: item.gender,
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;
        if (status === 404) {
          throw new Error('Character not found (404)');
        } else if (status === 500) {
          throw new Error('Server error (500)');
        } else {
          throw new Error(`Request error (${status})`);
        }
      } else {
        throw new Error('Unknown network error');
      }
    }
  }
};
