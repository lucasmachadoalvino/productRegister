import { Input } from '../../components/Input';
import { ConfigButton, Container, Content, Header, InputContainer } from './styles';

import { useState } from 'react';
import ConfigSvg from '../../assets/config.svg';
import FindSvg from '../../assets/find.svg';

import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { ProductTable } from '../../components/ProductTable';

export const HomeScreen = () => {
	const [findProduct, setFindProduct] = useState('');

	const theme = useTheme();

	return (
		<Container>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Header>
					<ConfigButton hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}>
						<ConfigSvg height={24} width={24} stroke={theme.colors.text} fill={theme.colors.text} />
					</ConfigButton>

					<InputContainer>
						<Input
							placeholder="Buscar Produto"
							// marginBottom="default"
							keyboardType="numbers-and-punctuation"
							value={findProduct}
							maxLength={14}
							rightIcon={<FindSvg height={24} width={24} />}
							onChangeText={(value) => {
								// handleUpdateCpf(value);
								// debouncedValidadeCpf(value);
							}}
						/>
					</InputContainer>
				</Header>

				<Content>
					<Input
						title="Identificador"
						editable={false}
						value={findProduct}
						marginBottom="default"
						onChangeText={(value) => {
							// handleUpdateCpf(value);
							// debouncedValidadeCpf(value);
						}}
					/>

					<Input
						title="Nome"
						placeholder="Digite o nome do produto"
						marginBottom="default"
						// editable={false}
						value={findProduct}
						onChangeText={(value) => {
							// handleUpdateCpf(value);
							// debouncedValidadeCpf(value);
						}}
					/>

					<Input
						title="Quantidade em estoque"
						placeholder="Digite a quantidade em estoque"
						marginBottom="default"
						// editable={false}
						value={findProduct}
						onChangeText={(value) => {
							// handleUpdateCpf(value);
							// debouncedValidadeCpf(value);
						}}
					/>

					<Input
						title="Valor unitário"
						placeholder="Digite o valor unitário"
						marginBottom="default"
						// editable={false}
						value={findProduct}
						onChangeText={(value) => {
							// handleUpdateCpf(value);
							// debouncedValidadeCpf(value);
						}}
					/>

					<Input
						title="Valor total"
						placeholder="Digite o valor total"
						marginBottom="default"
						// editable={false}
						value={findProduct}
						onChangeText={(value) => {
							// handleUpdateCpf(value);
							// debouncedValidadeCpf(value);
						}}
					/>

					<Button title="Salvar" onPress={() => {}} marginBottom="large" />

					<ProductTable />
				</Content>
			</ScrollView>
		</Container>
	);
};
