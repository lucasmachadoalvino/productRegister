import { Routes } from './src/routes';
import { ThemeProvider } from './src/theming/Theme';

export default function App() {
	return (
		<ThemeProvider>
			<Routes />
		</ThemeProvider>
	);
}
