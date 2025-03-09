import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it, Mock, vi } from 'vitest';
import ThemeProvider from '../../../providers/ThemeProvider/ThemeProvider';
import { peopleApi, useGetPeopleByIdQuery } from '../../../store/people/peopleApi';
import { rootReducer } from '../../../store/store';
import Card from './Card';

vi.mock('../../../store/people/peopleApi', async () => {
  const actual = await vi.importActual<typeof peopleApi>('../../../store/people/peopleApi');

  return {
    ...actual,
    endpoints: {
      ...actual.endpoints,
      getPeopleById: {
        useQuery: vi.fn(() => ({
          data: {
            name: 'Luke Skywalker',
            gender: 'Male',
            height: '172',
            mass: '77',
            birth_year: '19BBY',
            hair_color: 'Blond',
            skin_color: 'Fair',
            eye_color: 'Blue',
          },
          isFetching: false,
          isError: false,
        })),
      },
      getListPeoples: {
        useQuery: vi.fn(() => ({
          data: [],
          isFetching: false,
          isError: false,
        })),
      },
    },
  };
});
vi.mock('../../../store/people/peopleApi', async () => {
  const actual = await vi.importActual<typeof import('../../../store/people/peopleApi')>(
    '../../../store/people/peopleApi'
  );
  return {
    ...actual,
    useGetPeopleByIdQuery: vi.fn()
  };
});

const mockStore = configureStore({
  reducer: rootReducer,
});

describe('Card Component', () => {
  it('Displays a loading indicator while fetching data', async () => {
    (useGetPeopleByIdQuery as Mock).mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
    });
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/?details=1']}>
            <Routes>
              <Route path="/" element={<Card />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider >
    );

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('Correctly displays detailed card data', async () => {
    const mockPersonData = {
      name: 'Luke Skywalker',
      gender: 'Male',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      hair_color: 'Blond',
      skin_color: 'Fair',
      eye_color: 'Blue',
    };

    (useGetPeopleByIdQuery as Mock).mockReturnValue({
      data: mockPersonData,
      isFetching: false,
      isError: false,
    });

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/?details=1']}>
            <Routes>
              <Route path="/" element={<Card />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
    expect(screen.getByText(/Male/)).toBeInTheDocument();
    expect(screen.getByText(/172/)).toBeInTheDocument();
    expect(screen.getByText(/77/)).toBeInTheDocument();
  });

  it('Ensures clicking the close button hides the component', async () => {
    const mockPersonData = {
      name: 'Luke Skywalker',
      gender: 'Male',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      hair_color: 'Blond',
      skin_color: 'Fair',
      eye_color: 'Blue',
    };

    (useGetPeopleByIdQuery as Mock).mockReturnValue({
      data: mockPersonData,
      isFetching: false,
      isError: false,
    });

    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <MemoryRouter initialEntries={['/?details=1']}>
            <Routes>
              <Route path="/" element={<Card />} />
            </Routes>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
    await waitFor(() =>
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    );
    const closeButton = screen.getByText(/x/);
    fireEvent.click(closeButton);
  });
});
