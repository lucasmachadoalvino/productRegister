import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

import { Input } from '../../components/Input';

import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';

import { useUser } from '../../contexts/UserContext';
import { useFormat } from '../../utils/useFormat';
import { useValidade } from '../../utils/useValidade';
import { Container, Content, InputContent } from './styles';

import { useTheme } from 'styled-components/native';
import EyeClose from '../../assets/eye-close.svg';
import EyeOpen from '../../assets/eye-open.svg';

import { KeyboardAvoidingView, Platform } from 'react-native';
import { useUserAlert } from '../../utils/alerts/useUserAlerts';

export const SignInScreen = () => {
	const [cpf, setCpf] = useState('');
	const [cpfError, setCpfError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	const { validateCpf, validadePassword } = useValidade();
	const { formatCpf } = useFormat();

	const theme = useTheme();

	const {
		cpfEmptyAlert,
		cpfInvalidAlert,
		passwordEmptyAlert,
		passwordInvalidAlert,
		loginInvalidAlert,
	} = useUserAlert();

	const { validadeLogin } = useUser();
	const navigation = useNavigation();

	const handleValidateCpf = (newValue: string) => {
		const isValid = validateCpf(newValue);
		if (!isValid) {
			setCpfError('CPF inválido');
		} else {
			setCpfError('');
		}
	};

	const handleValidatePassword = (newValue: string) => {
		const isValid = validadePassword(newValue);
		if (!isValid) {
			setPasswordError('Senha inválida');
		} else {
			setPasswordError('');
		}
	};

	const debounceValidadeCpf = useCallback(
		debounce((nextValue) => handleValidateCpf(nextValue), 1000),
		[]
	);

	const debounceValidadePassword = useCallback(
		debounce((nextValue) => handleValidatePassword(nextValue), 1000),
		[]
	);

	const handleUpdateCpf = (newValue: string) => {
		const formattedCpf = formatCpf(newValue);
		setCpf(formattedCpf);
	};

	const handleOnPressLogin = useCallback(() => {
		if (!cpf) {
			return cpfEmptyAlert();
		}

		if (!validateCpf(cpf)) {
			return cpfInvalidAlert();
		}

		if (!password) {
			return passwordEmptyAlert();
		}

		if (!validadePassword(password)) {
			return passwordInvalidAlert();
		}

		const isValidLogin = validadeLogin(cpf, password);

		if (!isValidLogin) {
			return loginInvalidAlert();
		}

		navigation.reset({
			index: 0,
			routes: [{ name: 'Home' } as never],
		});
	}, [
		cpf,
		password,
		validadeLogin,
		navigation,
		cpfEmptyAlert,
		cpfInvalidAlert,
		passwordEmptyAlert,
		passwordInvalidAlert,
		loginInvalidAlert,
		validateCpf,
		validadePassword,
	]);

	return (
		<Container>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<Content>
					<Text fontSize="extraLarge" fontWeight="bold" marginBottom="small">
						Bem-vindo!
					</Text>
					<Text fontSize="extraLarge" fontWeight="semiBold">
						Faça login na sua conta
					</Text>
				</Content>

				<InputContent>
					<Input
						title="CPF"
						errorMessage={cpfError}
						placeholder="Digite seu cpf"
						marginBottom="default"
						keyboardType="numbers-and-punctuation"
						value={cpf}
						maxLength={14}
						onChangeText={(value) => {
							handleUpdateCpf(value);
							debounceValidadeCpf(value);
						}}
					/>

					<Input
						title="Senha"
						placeholder="Digite sua senha"
						value={password}
						secureTextEntry={!showPassword}
						keyboardType="visible-password"
						errorMessage={passwordError}
						onChangeText={(value) => {
							setPassword(value);
							debounceValidadePassword(value);
						}}
						marginBottom="extraLarge"
						rightIcon={
							!showPassword ? (
								<EyeClose
									width={24}
									height={24}
									stroke={theme.colors.text}
									fill={theme.colors.text}
									testID="EyeCloseSignIn"
								/>
							) : (
								<EyeOpen
									width={24}
									height={24}
									stroke={theme.colors.text}
									fill={theme.colors.text}
									testID="EyeOpenSignIn"
								/>
							)
						}
						rightIconOnPress={() => setShowPassword(!showPassword)}
					/>

					<Button title="Entrar" onPress={handleOnPressLogin} />
				</InputContent>
			</KeyboardAvoidingView>
		</Container>
	);
};
