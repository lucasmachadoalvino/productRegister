import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { Input } from '../../components/Input';

import { useFormat } from '../../utils/useFormat';
import { useValidade } from '../../utils/useValidade';
import { Container, InputContent } from './styles';

export const SignInScreen = () => {
	const [cpf, setCpf] = useState('');
	const [cpfError, setCpfError] = useState('');

	const { validateCpf } = useValidade();
	const { formatCpf } = useFormat();

	const handleValidateCpf = (newValue: string) => {
		const isValid = validateCpf(newValue);
		if (!isValid) {
			setCpfError('CPF inválido');
		} else {
			setCpfError('');
		}
	};

	const debouncedValidadeCpf = useCallback(
		debounce((nextValue) => handleValidateCpf(nextValue), 1000),
		[]
	);

	const hndleUpdateCpf = (newValue: string) => {
		const formattedCpf = formatCpf(newValue);
		setCpf(formattedCpf);
	};

	return (
		<Container>
			{/* <Content> */}

			{/* <Text fontSize="extraLarge" fontWeight="semiBold" marginBottom="extraLarge">
				// Faça login na sua conta //{' '}
			</Text>
			// {/* </Content> */}
			{/* //{' '} */}
			<InputContent>
				<Input
					title="CPF"
					errorMessage={cpfError}
					placeholder="Digite seu cpf"
					// marginBottom="extraLarge"
					keyboardType="numbers-and-punctuation"
					value={cpf}
					maxLength={14}
					onChangeText={(value) => {
						hndleUpdateCpf(value);
						debouncedValidadeCpf(value);
					}}
				/>
				<Input title="CPF" placeholder="Digite seu cpf" value={cpfError} />
				{/* // <Input title="Senha" placeholder="Digite sua senha" /> */}
			</InputContent>
		</Container>
	);
};
