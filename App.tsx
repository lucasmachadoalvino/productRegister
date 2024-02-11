import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { UserProvider } from './src/contexts/UserContext';
import { Routes } from './src/routes';
import { store } from './src/store';
import { ThemeProvider } from './src/theming/Theme';

let persistor = persistStore(store);

export default function App() {
	return (
		<ThemeProvider>
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<UserProvider>
						<Routes />
					</UserProvider>
				</PersistGate>
			</ReduxProvider>
		</ThemeProvider>
	);
}
