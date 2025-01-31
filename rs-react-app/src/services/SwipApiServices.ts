import { ApiResponse } from "../types/resultAPI.interface";

export const SwapiApiServices = {
  get: async (endpoint: string): Promise<ApiResponse> => {
    const response = await fetch(`https://swapi.dev/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Wrong: ${response.status}`);
    }
    return await response.json();
  }
}