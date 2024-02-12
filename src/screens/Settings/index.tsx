import { useNavigation } from '@react-navigation/native';
import { Switch, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import LeftArrow from '../../assets/left-arrow.svg';
import { Text } from '../../components/Text';
import { useThemeContext } from '../../theming/Theme';
import { Container, Content, Header, SwitchContainer, TitleContainer } from './styles';

export const SettingsScreen = () => {
	const { toggleTheme, theme: themeApp } = useThemeContext();

	const theme = useTheme();
	const navigation = useNavigation();

	return (
		<Container>
			<Header>
				<TouchableOpacity onPress={navigation.goBack}>
					<LeftArrow
						height={24}
						width={24}
						stroke={theme.colors.text}
						fill={theme.colors.text}
						testID="SettingsBackIcon"
					/>
				</TouchableOpacity>
				<TitleContainer>
					<Text fontSize="large" fontWeight="bold">
						Settings
					</Text>
				</TitleContainer>
			</Header>

			<Content>
				<SwitchContainer>
					<Switch
						trackColor={{ false: theme.colors.toggle, true: theme.colors.toggleActive }}
						onValueChange={toggleTheme}
						value={themeApp === 'dark'}
						testID="SettingsSwitch"
					/>
					<Text fontSize="medium" fontWeight="medium" marginLeft="default">
						Modo escuro
					</Text>
				</SwitchContainer>
			</Content>
		</Container>
	);
};
