import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { store } from '../store';
import { lightTheme } from '../theming/lightTheme';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={lightTheme}>
			<ReduxProvider store={store}>
				<NavigationContainer>{children}</NavigationContainer>
			</ReduxProvider>
		</ThemeProvider>
	);
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
