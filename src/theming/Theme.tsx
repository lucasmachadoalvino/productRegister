import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider as ThemeProviderStyled } from 'styled-components/native';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

interface ThemeProviderProps {
	children: React.ReactNode;
}

interface ThemeContextType {
	theme: ThemeType;
	toggleTheme: () => void;
}

export enum ThemeType {
	light = 'light',
	dark = 'dark',
}

const themes = {
	[ThemeType.light]: lightTheme,
	[ThemeType.dark]: darkTheme,
};

const ThemeContext = createContext<ThemeContextType>({
	theme: ThemeType.light,
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState(ThemeType.light);
	const scheme = useColorScheme();

	useEffect(() => {
		loadTheme();
	}, []);

	const loadTheme = async () => {
		const savedTheme = (await AsyncStorage.getItem('@theme')) as ThemeType;

		if (savedTheme) {
			setTheme(savedTheme);
		} else if (scheme === 'dark') {
			setTheme(ThemeType.dark);
		} else {
			setTheme(ThemeType.light);
		}
	};

	const toggleTheme = () => {
		let newTheme;
		if (theme === ThemeType.light) {
			newTheme = ThemeType.dark;
		} else {
			newTheme = ThemeType.light;
		}

		AsyncStorage.setItem('@theme', newTheme);
		setTheme(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<ThemeProviderStyled theme={themes[theme]}>{children}</ThemeProviderStyled>
		</ThemeContext.Provider>
	);
};

export const useThemeContext = (): ThemeContextType => {
	return useContext(ThemeContext);
};
