import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ThemeProvider from '../../providers/ThemeProvider/ThemeProvider';
import Header from './Header';

vi.mock('./ToggleTheme/ToggleTheme', () => ({
	default: vi.fn(() => <div role="button" />),
}));

vi.mock('./Search/Search', () => ({
	default: vi.fn(() => <input placeholder="Search" />),
}));

vi.mock('../../../providers/ThemeProvider/useTheme', () => ({
	useThemeValues: vi.fn(() => 'light'),
	useThemeActions: vi.fn(() => ({ handleTheme: vi.fn() })),
}));

describe('Header Component', () => {
	it('renders the logo correctly', () => {
		render(
			<ThemeProvider>
				<Header />
			</ThemeProvider>
		);

		const logo = screen.getByAltText(/logo/i);
		expect(logo).toBeInTheDocument();
	});

	it('renders ToggleTheme and Search components', () => {
		render(
			<ThemeProvider>
				<Header />
			</ThemeProvider>
		);

		const toggleButton = screen.getByRole('button');
		expect(toggleButton).toBeInTheDocument();

		const searchInput = screen.getByPlaceholderText(/search/i);
		expect(searchInput).toBeInTheDocument();
	});
});
