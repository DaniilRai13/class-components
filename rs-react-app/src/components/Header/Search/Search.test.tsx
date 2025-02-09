import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Search from './Search';

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
  const mockOnSearchResults = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnSearchResults.mockClear();
  });

  it('saves search term to localStorage when search button is clicked', async () => {
    render(<Search isLoading={false} onSearchResults={mockOnSearchResults} />);

    const input = screen.getByPlaceholderText('Start typing...');
    const button = screen.getByText('Search');

    await userEvent.type(input, 'Luke Skywalker');
    fireEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('luke skywalker');
  });

  it('retrieves search term from localStorage on mount', () => {
    localStorage.setItem('searchTerm', 'Darth Vader');

    render(<Search isLoading={false} onSearchResults={mockOnSearchResults} />);

    const input = screen.getByPlaceholderText('Start typing...');
    expect(input).toHaveValue('Darth Vader');
  });

  it('calls onSearchResults when search button is clicked', async () => {
    render(<Search isLoading={false} onSearchResults={mockOnSearchResults} />);

    const input = screen.getByPlaceholderText('Start typing...');
    const button = screen.getByText('Search');

    await userEvent.type(input, 'Yoda');
    fireEvent.click(button);

    expect(mockOnSearchResults).toHaveBeenCalledWith('yoda');
  });
});
