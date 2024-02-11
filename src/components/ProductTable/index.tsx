import React from 'react';
import { ScrollView } from 'react-native';
// import { addProduct } from '../../store/features/products/produtSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Text } from '../Text';
import { ProductTableProps } from './interfaces';
import { Container, DataRow, Header, HeaderText, IdCell, NameCell, QuantityCell } from './styles';

export const ProductTable = ({ onProductPress }: ProductTableProps) => {
	const dispatch = useAppDispatch();
	const products = useAppSelector((state) => state.product.list);
	const filteredProducts = useAppSelector((state) => state.product.filteredProducts);

	const data = filteredProducts.length > 0 ? filteredProducts : products;

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<Container>
				<Header>
					<IdCell>
						<HeaderText>ID</HeaderText>
					</IdCell>

					<NameCell>
						<HeaderText>Name</HeaderText>
					</NameCell>

					<QuantityCell>
						<HeaderText>Estoque</HeaderText>
					</QuantityCell>

					<QuantityCell>
						<HeaderText>Valor</HeaderText>
					</QuantityCell>

					<QuantityCell>
						<HeaderText>Total</HeaderText>
					</QuantityCell>
				</Header>

				{data.map((product) => (
					<DataRow key={product.id} onPress={() => onProductPress(product)}>
						<IdCell>
							<Text>{product.id}</Text>
						</IdCell>

						<NameCell>
							<Text>{product.name}</Text>
						</NameCell>

						<QuantityCell>
							<Text>{product.stock}</Text>
						</QuantityCell>

						<QuantityCell>
							<Text>{product.value}</Text>
						</QuantityCell>

						<QuantityCell>
							<Text>{product.total}</Text>
						</QuantityCell>
					</DataRow>
				))}
			</Container>
		</ScrollView>
	);
};
