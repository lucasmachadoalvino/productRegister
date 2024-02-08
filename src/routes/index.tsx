import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useUser } from '../contexts/UserContext';
import { RegisterScreen } from '../screens/Register';
import { SignInScreen } from '../screens/SignIn';
import { HomeScreen } from '../screens/home';
import { Container } from './styles';

export type StackParamList = {
	SignIn: undefined;
	Register: undefined;
	Home: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export function Routes() {
	const { cpf, isLoadingUser } = useUser();
	const theme = useTheme();

	if (isLoadingUser) {
		return (
			<Container>
				<ActivityIndicator color={theme.colors.button} />
			</Container>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={cpf != '' ? 'SignIn' : 'Register'}
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="SignIn" component={SignInScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
