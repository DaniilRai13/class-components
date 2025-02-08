export interface IPeoples {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPeople[];
}
export interface IPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
}
