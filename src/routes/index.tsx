import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '../screens/signIn';

const Stack = createNativeStackNavigator();

export function Routes() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={SignInScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
