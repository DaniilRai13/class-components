import { createContext, useContext } from 'react'

export type IThemeValuesTypes = 'light' | 'dark'
export type IThemeActionsTypes = {
	handleTheme: (theme: IThemeValuesTypes) => void
}

export const ThemeValuesContext = createContext<IThemeValuesTypes | undefined>(undefined)
export const ThemeActionsContext = createContext<IThemeActionsTypes | undefined>(undefined)

export const useThemeValues = () => {
	const themeContext = useContext(ThemeValuesContext)
	if (!themeContext) {
		throw new Error('Context do not exist!')
	}
	return themeContext
}

export const useThemeActions = () => {
	const themeContext = useContext(ThemeActionsContext)
	if (!themeContext) {
		throw new Error('Context do not exist!')
	}
	return themeContext
}