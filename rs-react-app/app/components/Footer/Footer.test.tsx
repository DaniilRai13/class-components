import { render, screen } from '@testing-library/react';
import ThemeProvider from '../../providers/ThemeProvider/ThemeProvider';
import Footer from './Footer';

describe('Footer Component', () => {
	const renderFooter = () => {
		return render(
			<ThemeProvider>
				<Footer />
			</ThemeProvider>
		);
	};

	it('renders the footer', () => {
		renderFooter();

		expect(screen.getByText(/© 2025 Rai Daniil. All rights reserved./)).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Telegram/i })).toHaveAttribute('href', 'https://t.me/DaniilRai');
		expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', 'https://github.com/DaniilRai13/');
	});
});