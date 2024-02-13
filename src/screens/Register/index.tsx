import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Text } from '../../components/Text';
import { useUser } from '../../contexts/UserContext';
import { StackParamList } from '../../routes';
import { useFormat } from '../../utils/useFormat';
import { useValidade } from '../../utils/useValidade';
import { Container, Content, InputContent } from './styles';

import EyeClose from '../../assets/eye-close.svg';
import EyeOpen from '../../assets/eye-open.svg';
import { useUserAlert } from '../../utils/alerts/useUserAlerts';

export const RegisterScreen = () => {
	const [cpf, setCpf] = useState('');
	const [cpfError, setCpfError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	const { formatCpf } = useFormat();
	const { validateCpf, validadePassword } = useValidade();
	const { cpfEmptyAlert, cpfInvalidAlert, passwordEmptyAlert, passwordInvalidAlert } =
		useUserAlert();

	const navigation = useNavigation<StackParamList>();

	const { registerUser } = useUser();

	const handleValidateCpf = (newValue: string) => {
		const isValid = validateCpf(newValue);
		if (!isValid) {
			setCpfError('CPF inválido');
		} else {
			setCpfError('');
		}
	};

	const handleUpdateCpf = (newValue: string) => {
		const formattedCpf = formatCpf(newValue);
		setCpf(formattedCpf);
	};

	const debounceValidadeCpf = useCallback(
		debounce((nextValue) => handleValidateCpf(nextValue), 1000),
		[]
	);

	const handleValidatePassword = (newValue: string) => {
		const isValid = validadePassword(newValue);
		if (!isValid) {
			setPasswordError('Senha inválida');
		} else {
			setPasswordError('');
		}
	};

	const debounceValidadePassword = useCallback(
		debounce((nextValue) => handleValidatePassword(nextValue), 1000),
		[]
	);

	const handleOnPressRegister = () => {
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

		registerUser(cpf, password);

		Alert.alert('Conta cadastrada', 'Sua conta foi cadastrada com sucesso', [
			{
				text: 'Continuar',
				onPress: () =>
					navigation.reset({
						index: 0,
						routes: [{ name: 'SignIn' }],
					} as never),
				style: 'cancel',
			},
		]);
	};

	return (
		<Container>
			<Content>
				<Text fontSize="extraLarge" fontWeight="bold" marginBottom="small">
					Bem-vindo!
				</Text>
				<Text fontSize="large" fontWeight="semiBold">
					Realize seu cadastro
				</Text>
			</Content>

			<InputContent>
				<Input
					title="CPF"
					errorMessage={cpfError}
					placeholder="Digite seu cpf"
					marginBottom="default"
					keyboardType="numeric"
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
							<EyeClose width={24} height={24} testID="EyeCloseRegister" />
						) : (
							<EyeOpen width={24} height={24} testID="EyeOpenRegister" />
						)
					}
					rightIconOnPress={() => setShowPassword(!showPassword)}
				/>

				<Button title="Registrar" onPress={handleOnPressRegister} />
			</InputContent>
		</Container>
	);
};
