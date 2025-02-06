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
}
