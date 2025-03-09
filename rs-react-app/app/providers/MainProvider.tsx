import Layout, { ILayoutProps } from '@/components/Layout/Layout'
import { store } from '@/store/store'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import ThemeProvider from './ThemeProvider/ThemeProvider'

const MainProvider: FC<ILayoutProps> = ({ children }: { children?: ReactNode }) => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<Layout>{children}</Layout>
			</ThemeProvider>
		</Provider>
	)
}

export default MainProvider