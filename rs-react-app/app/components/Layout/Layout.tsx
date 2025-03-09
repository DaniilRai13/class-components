import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useThemeValues } from '../../providers/ThemeProvider/useTheme';
import ErrorBoundary from '../../shared/ErrorBoundary/ErrorBoundary';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

export interface ILayoutProps {
	children?: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
	const { errorMessage } = useTypedSelector(({ errorReducer }) => errorReducer);
	const { handleError, resetError: reset } = useActions();
	const router = useRouter();
	const theme = useThemeValues()

	const throwError = () => {
		handleError('Test error');
		throw new Error('Test error');
	};

	const resetError = () => {
		reset();
		router.push('/');
	};
	return (
		<ErrorBoundary error={errorMessage || ''} resetError={resetError}>
			<div className={styles.app} data-theme={theme === 'light' ? 'light' : 'dark'}>
				<div className={styles.container}>
					<Header />
					{children}
					<Footer />
					<button className={styles.throwErrorBtn} onClick={throwError}>
						Throw Error
					</button>
				</div>
			</div>
		</ErrorBoundary>
	)
}

export default Layout