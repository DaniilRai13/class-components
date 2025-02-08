import { IPeople, IPeoples } from '../types/resultAPI.interface';

export const SwapiApiServices = {
  get: async (endpoint: string): Promise<IPeoples> => {
    const response = await fetch(`https://swapi.dev/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const data = await response.json();

    return {
      ...data,
      results: data.results.map((item: IPeople) => ({
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
  },
};
