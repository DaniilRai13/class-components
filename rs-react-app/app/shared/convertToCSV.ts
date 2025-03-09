import { IPeople } from '../types/resultAPI.interface';

export const convertToCSV = (items: IPeople[]): string => {
  const headers: (keyof IPeople)[] = [
    'name',
    'mass',
    'gender',
    'url',
    'birth_year',
  ];
  const rows = items.map((item) => headers.map((h) => item[h]).join(';'));

  return [headers.join(';'), ...rows].join('\n');
};
