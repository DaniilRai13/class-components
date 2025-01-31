export interface IPeoples {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPeople[];
}
export interface IPeople {
  name: string;
  height: string;
  mass: string
}
export interface IPlanets {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPlanet[];
}
export interface IPlanet {
  name: string;
  climate: string;
  terrain: string
}
export interface IFilms {
  count: number;
  next: string | null;
  previous: string | null;
  results: IFilm[];
}
export interface IFilm {
  title: string;
  director: string;
  release_date: string
}
export interface ISpecies {
  count: number;
  next: string | null;
  previous: string | null;
  results: ISpecie[];
}
export interface ISpecie {
  name: string;
  classification: string
}
export interface IVehicles {
  count: number;
  next: string | null;
  previous: string | null;
  results: IVehicle[];
}
export interface IVehicle {
  name: string;
  model: string;
  manufacturer: string
}
export interface IStarships {
  count: number;
  next: string | null;
  previous: string | null;
  results: IStarship[];
}
export interface IStarship {
  name: string;
  model: string;
  manufacturer: string
}
export type ApiResponse =
  | IPeoples
  | IPlanets
  | IFilms
  | ISpecies
  | IVehicles
  | IStarships;