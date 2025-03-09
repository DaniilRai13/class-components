import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import ThemeProvider from '../../../providers/ThemeProvider/ThemeProvider';
import { useThemeActions, useThemeValues } from '../../../providers/ThemeProvider/useTheme';
import ToggleTheme from './ToggleTheme';

vi.mock('../../../providers/ThemeProvider/useTheme', () => ({
	useThemeValues: vi.fn(),
	useThemeActions: vi.fn(),
}));

vi.mock('../../../providers/ThemeProvider/useTheme', async () => {
	const actual = await vi.importActual<typeof import('../../../providers/ThemeProvider/useTheme')>(
		'../../../providers/ThemeProvider/useTheme'
	);

	return {
		...actual,
		useThemeValues: vi.fn(),
		useThemeActions: vi.fn(),
	};
});

describe('ToggleTheme Component', () => {
	it('renders the component with light theme', () => {
		(useThemeValues as Mock).mockReturnValue('light');

		const mockHandleTheme = vi.fn();
		(useThemeActions as Mock).mockReturnValue({ handleTheme: mockHandleTheme });

		render(
			<ThemeProvider>
				<ToggleTheme />
			</ThemeProvider>
		);

		const toggleElement = screen.getByRole('button');
		expect(toggleElement).toHaveAttribute('data-theme', 'light');
	});

	it('renders the component with dark theme', () => {
		(useThemeValues as Mock).mockReturnValue('dark');

		const mockHandleTheme = vi.fn();
		(useThemeActions as Mock).mockReturnValue({ handleTheme: mockHandleTheme });

		render(
			<ThemeProvider>
				<ToggleTheme />
			</ThemeProvider>
		);

		const toggleElement = screen.getByRole('button');
		expect(toggleElement).toHaveAttribute('data-theme', 'dark');
	});

	it('toggles theme on click from light to dark', () => {
		(useThemeValues as Mock).mockReturnValue('light');

		const mockHandleTheme = vi.fn();
		(useThemeActions as Mock).mockReturnValue({ handleTheme: mockHandleTheme });

		render(
			<ThemeProvider>
				<ToggleTheme />
			</ThemeProvider>
		);

		const toggleButton = screen.getByRole('button');
		fireEvent.click(toggleButton);

		expect(mockHandleTheme).toHaveBeenCalledWith('dark');
	});

	it('toggles theme back to light on click', () => {
		(useThemeValues as Mock).mockReturnValue('dark');

		const mockHandleTheme = vi.fn();
		(useThemeActions as Mock).mockReturnValue({ handleTheme: mockHandleTheme });

		render(
			<ThemeProvider>
				<ToggleTheme />
			</ThemeProvider>
		);

		const toggleButton = screen.getByRole('button');
		fireEvent.click(toggleButton);
		expect(mockHandleTheme).toHaveBeenCalledWith('light');
	});
});
