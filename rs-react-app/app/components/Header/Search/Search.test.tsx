import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import ThemeProvider from '../../../providers/ThemeProvider/ThemeProvider';
import { useLazyGetQueryQuery } from '../../../store/people/peopleApi';
import { store } from '../../../store/store';
import Search from './Search';

vi.mock('../../../store/people/peopleApi', async () => {
  const actual = await vi.importActual<typeof import('../../../store/people/peopleApi')>(
    '../../../store/people/peopleApi'
  );
  return {
    ...actual,
    useLazyGetQueryQuery: vi.fn()
  };
});
vi.mock('../../../shared/useLocalStorage', () => ({
  useLocalStorage: (key: string) => {
    if (key === 'searchTerm') {
      return {
        value: '' };
      }
      return { value: '' };
    },
  }));
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Search Component', () => {
  const mockTrigger = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    mockTrigger.mockClear();
    vi.spyOn(global.localStorage, 'setItem');
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('saves search term to localStorage when search button is clicked', async () => {
    (useLazyGetQueryQuery as Mock).mockReturnValue([
      mockTrigger,
      { isFetch: false }
    ]);
    mockTrigger.mockResolvedValue({ data: { results: [{ id: '1', name: 'Rick Sanchez' }] } });
    localStorage.clear();
    render(
      <Provider store={store}>
        <ThemeProvider>
            <Search />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Start typing...');
    expect(input).toHaveValue('');
    const button = screen.getByText('Search');
    await userEvent.type(input, 'People');
    fireEvent.click(button);
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', 'people');
      expect(localStorage.getItem('searchTerm')).toBe('people')
    });
  });

  it('calls trigger when search button is clicked', async () => {
    (useLazyGetQueryQuery as Mock).mockReturnValue([
      mockTrigger,
      { isFetch: false }
    ]);
    render(
      <Provider store={store}>
        <ThemeProvider>
            <Search />
        </ThemeProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Start typing...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'people/' } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockTrigger).toHaveBeenCalledWith('people/');
    });
  });
});
