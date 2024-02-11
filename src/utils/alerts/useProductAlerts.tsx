import { Alert } from 'react-native';

export const useProductAlert = () => {
	const productNameEmptyAlert = () => {
		return Alert.alert('Atenção', 'Nome do produto não informado', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	const productQuantityEmptyAlert = () => {
		return Alert.alert('Atenção', 'Quantidade do produto não informado', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	const productValueEmptyAlert = () => {
		return Alert.alert('Atenção', 'Valor do produto não informado', [
			{
				text: 'entendi',
				style: 'cancel',
			},
		]);
	};

	return {
		productNameEmptyAlert,
		productQuantityEmptyAlert,
		productValueEmptyAlert,
	};
};
