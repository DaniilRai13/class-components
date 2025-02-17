import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPeople, IPeoples } from '../../types/resultAPI.interface';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getPeopleById: builder.query<IPeople, string>({
      query: (id) => `people/${id}`,
      transformResponse: (response: IPeople) => {
        return {
          name: response.name,
          height: response.height,
          mass: response.mass,
          hair_color: response.hair_color,
          skin_color: response.skin_color,
          eye_color: response.eye_color,
          birth_year: response.birth_year,
          gender: response.gender,
          id: response.url.split('/')[response.url.split('/').length - 2],
          url: response.url,
        };
      },
    }),
    getListPeoples: builder.query<IPeoples, number | void>({
      query: (page = 1) => `people?page=${page}`,
      transformResponse: (response: IPeoples) => {
        return {
          ...response,
          results: response.results.map((item: IPeople) => ({
            name: item.name,
            height: item.height,
            mass: item.mass,
            hair_color: item.hair_color,
            skin_color: item.skin_color,
            eye_color: item.eye_color,
            birth_year: item.birth_year,
            gender: item.gender,
            id: item.url.split('/')[item.url.split('/').length - 2],
            url: item.url,
          })),
        };
      },
    }),
  }),
});

export const { useGetPeopleByIdQuery, useGetListPeoplesQuery } = peopleApi;
