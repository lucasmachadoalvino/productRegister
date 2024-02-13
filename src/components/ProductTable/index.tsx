import React from 'react';
import { ScrollView } from 'react-native';
import { orderProducts } from '../../store/features/products/produtSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Text } from '../Text';
import { ProductTableProps } from './interfaces';
import {
	Container,
	DataRow,
	Header,
	HeaderText,
	IdCell,
	IdData,
	NameCell,
	NameData,
	QuantityCell,
	QuantityData,
} from './styles';

export const ProductTable = ({ onProductPress }: ProductTableProps) => {
	const dispatch = useAppDispatch();
	const products = useAppSelector((state) => state.product.products);
	const filteredProducts = useAppSelector((state) => state.product.filteredProducts);

	const data = filteredProducts.length > 0 ? filteredProducts : products;

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} testID="ProductTable">
			<Container>
				<Header>
					<IdCell onPress={() => dispatch(orderProducts('id'))}>
						<HeaderText>ID</HeaderText>
					</IdCell>

					<NameCell onPress={() => dispatch(orderProducts('name'))}>
						<HeaderText>Name</HeaderText>
					</NameCell>

					<QuantityCell onPress={() => dispatch(orderProducts('stock'))}>
						<HeaderText>Estoque</HeaderText>
					</QuantityCell>

					<QuantityCell onPress={() => dispatch(orderProducts('value'))}>
						<HeaderText>Valor</HeaderText>
					</QuantityCell>

					<QuantityCell onPress={() => dispatch(orderProducts('total'))}>
						<HeaderText>Total</HeaderText>
					</QuantityCell>
				</Header>

				{data.map((product) => (
					<DataRow key={product.id} onPress={() => onProductPress(product)}>
						<IdData>
							<Text>{product.id}</Text>
						</IdData>

						<NameData>
							<Text>{product.name}</Text>
						</NameData>

						<QuantityData>
							<Text>{product.stock}</Text>
						</QuantityData>

						<QuantityData>
							<Text>{product.value}</Text>
						</QuantityData>

						<QuantityData>
							<Text>{product.total}</Text>
						</QuantityData>
					</DataRow>
				))}
			</Container>
		</ScrollView>
	);
};
