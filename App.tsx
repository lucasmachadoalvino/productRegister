import { UserProvider } from './src/contexts/UserContext';
import { Routes } from './src/routes';
import { ThemeProvider } from './src/theming/Theme';

export default function App() {
	return (
		<ThemeProvider>
			<UserProvider>
				<Routes />
			</UserProvider>
		</ThemeProvider>
	);
}
