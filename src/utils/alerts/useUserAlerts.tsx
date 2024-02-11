import { Alert } from 'react-native';

export const useUserAlert = () => {
	const cpfEmptyAlert = () => {
		return Alert.alert('Atenção', 'CPF não informado', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	const cpfInvalidAlert = () => {
		return Alert.alert('Atenção', 'O CPF informado é inválido', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	const passwordEmptyAlert = () => {
		return Alert.alert('Atenção', 'Senha não informado', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	const passwordInvalidAlert = () => {
		return Alert.alert('Atenção', 'A senha precisa conter ao menos 8 carácteres', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	const loginInvalidAlert = () => {
		return Alert.alert('Atenção', 'O cpf ou a senha estao errados', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	const productNameEmptyAlert = () => {
		return Alert.alert('Atenção', 'Nome do produto não informado', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	return {
		cpfEmptyAlert,
		cpfInvalidAlert,
		passwordEmptyAlert,
		passwordInvalidAlert,
		loginInvalidAlert,
		productNameEmptyAlert,
	};
};
