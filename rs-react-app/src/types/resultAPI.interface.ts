export interface IPeoples {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPeople[];
}
export interface IPeople {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}
