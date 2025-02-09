import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import Card from './Card';
import { useFetchSwap } from '../../../services/useFetchSwip';

vi.mock('../../../services/useFetchSwip', () => ({
  useFetchSwap: vi.fn(() => ({
    getPeople: vi.fn(),
    peopleResult: null,
  })),
}));

describe('Card Component', () => {
  it('Displays a loading indicator while fetching data', async () => {
    const mockGetPeople = vi.fn(() => new Promise(() => {}));
    (useFetchSwap as any).mockReturnValue({
      getPeople: mockGetPeople,
      peopleResult: null,
    });

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<Card closeDetail={() => {}} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('Correctly displays detailed card data', async () => {
    const mockPeopleData = {
      name: 'Luke Skywalker',
      gender: 'Male',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      hair_color: 'Blond',
      skin_color: 'Fair',
      eye_color: 'Blue',
    };

    (useFetchSwap as any).mockReturnValue({
      getPeople: vi.fn(),
      peopleResult: mockPeopleData,
    });

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<Card closeDetail={() => {}} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());
    expect(screen.getByText(/Male/)).toBeInTheDocument();
    expect(screen.getByText(/172/)).toBeInTheDocument();
  });

  it('Ensures clicking the close button hides the component', async () => {
    const closeDetailMock = vi.fn();

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<Card closeDetail={closeDetailMock} />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());
    const closeButton = screen.getByText(/Close Details/);
    fireEvent.click(closeButton);

    await waitFor(() => expect(closeDetailMock).toHaveBeenCalledWith(false));
  });
});
