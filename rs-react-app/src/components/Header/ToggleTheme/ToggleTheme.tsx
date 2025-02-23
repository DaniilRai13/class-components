import { FC } from 'react';
import styles from './ToggleTheme.module.scss'
import { useThemeActions, useThemeValues } from '../../../providers/ThemeProvider/useTheme';

const ToggleTheme: FC = () => {
	const theme = useThemeValues()
	const { handleTheme } = useThemeActions()

	const toggleTheme = () => {
		if (theme === 'light') handleTheme('dark')
		else handleTheme('light')
	}

	return (
		<div
			className={styles.toggleTheme}
			onClick={toggleTheme}
			role='button'
			data-theme={theme === 'light' ? 'light' : 'dark'}
		>
			<span></span>
		</div>
	)
}

export default ToggleTheme;