"use client"

import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { IThemeValuesTypes, ThemeActionsContext, ThemeValuesContext } from './useTheme';

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<IThemeValuesTypes>('light');

	const handleTheme = useCallback((value: IThemeValuesTypes) => {
		setTheme(value)
	}, [])

	const actions = useMemo(() => ({ handleTheme }), [handleTheme])

	return (
		<ThemeValuesContext.Provider value={theme}>
			<ThemeActionsContext.Provider value={actions}>
				{children}
			</ThemeActionsContext.Provider>
		</ThemeValuesContext.Provider >
	)
}

export default ThemeProvider