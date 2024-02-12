import { Input } from '../../components/Input';
import { ConfigButton, Container, Content, Header, InputContainer } from './styles';

import { useCallback, useEffect, useState } from 'react';
import ConfigSvg from '../../assets/config.svg';
import FindSvg from '../../assets/find.svg';

import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '../../components/Button';
import { ProductTable } from '../../components/ProductTable';
import {
	Product,
	addProduct,
	findProducts,
	removeProduct,
	updateProduct,
} from '../../store/features/products/produtSlice';
import { useAppDispatch } from '../../store/hooks';
import { useProductAlert } from '../../utils/alerts/useProductAlerts';

export const HomeScreen = () => {
	const [findProduct, setFindProduct] = useState('');

	const [productId, setProductId] = useState('');
	const [productName, setProductName] = useState('');
	const [productStock, setProductStock] = useState('');
	const [productValue, setProductValue] = useState('');
	const [productTotal, setProductTotal] = useState('');

	const theme = useTheme();

	const navigation = useNavigation();

	const dispatch = useAppDispatch();

	const { productNameEmptyAlert, productQuantityEmptyAlert, productValueEmptyAlert } =
		useProductAlert();

	useEffect(() => {
		setProductTotal((Number(productStock) * Number(productValue)).toString());
	}, [productStock, productValue]);

	const clearProductFields = () => {
		setProductName('');
		setProductStock('');
		setProductValue('');
		setProductTotal('');
		setProductId('');
	};

	const dispatchUpdateProduct = useCallback(() => {
		dispatch(
			updateProduct({
				id: Number(productId),
				name: productName,
				stock: Number(productStock),
				value: Number(productValue),
				total: Number(productTotal),
			})
		);

		clearProductFields();
	}, [dispatch, productId, productName, productStock, productValue, productTotal]);

	const dispatchRemoveProduct = useCallback(() => {
		dispatch(removeProduct({ productId }));
		clearProductFields();
	}, [dispatch, productId]);

	const dispatchSaveProduct = useCallback(() => {
		dispatch(
			addProduct({
				name: productName,
				stock: Number(productStock),
				value: Number(productValue),
				total: Number(productTotal),
			})
		);

		return clearProductFields();
	}, [dispatch, productName, productStock, productValue, productTotal]);

	const handleSaveProduct = () => {
		if (!productName) {
			return productNameEmptyAlert();
		}

		if (!productValue) {
			return productValueEmptyAlert();
		}

		if (!!productId) {
			if (!productStock) {
				dispatchRemoveProduct();
				return clearProductFields();
			}

			return dispatchUpdateProduct();
		}

		if (!productStock) {
			return productQuantityEmptyAlert();
		}

		return dispatchSaveProduct();
	};

	const handleProductPress = (product: Product) => {
		console.log('🚀 ~ handleProductPress ~ product:', product);
		setProductName(product.name);
		setProductStock(product.stock.toString());
		setProductValue(product.value.toString());
		setProductTotal(product.total.toString());
		setProductId(product.id.toString());
	};

	const debounceFindProduct = useCallback(
		debounce((nextValue) => dispatch(findProducts({ name: nextValue })), 1000),
		[]
	);

	return (
		<Container>
			<ScrollView showsVerticalScrollIndicator={false}>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<Header>
						<ConfigButton
							hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
							onPress={() => navigation.navigate('Settings')}
						>
							<ConfigSvg
								height={24}
								width={24}
								stroke={theme.colors.text}
								fill={theme.colors.text}
							/>
						</ConfigButton>

						<InputContainer>
							<Input
								placeholder="Buscar Produto"
								keyboardType="numbers-and-punctuation"
								value={findProduct}
								maxLength={14}
								rightIcon={
									<FindSvg
										height={24}
										width={24}
										stroke={theme.colors.text}
										fill={theme.colors.text}
									/>
								}
								rightIconOnPress={() => {
									dispatch(findProducts({ name: findProduct }));
								}}
								onChangeText={(value) => {
									setFindProduct(value);
									debounceFindProduct(value);
								}}
							/>
						</InputContainer>
					</Header>

					<Content>
						<Input
							title="Nome"
							placeholder="Digite o nome do produto"
							value={productName}
							marginBottom="medium"
							onChangeText={setProductName}
						/>

						<Input
							title="Quantidade em estoque"
							placeholder="Digite a quantidade em estoque"
							keyboardType="numeric"
							marginBottom="medium"
							value={productStock}
							onChangeText={setProductStock}
						/>

						<Input
							title="Valor unitário"
							placeholder="Digite o valor unitário"
							keyboardType="numeric"
							marginBottom="medium"
							value={productValue}
							onChangeText={setProductValue}
						/>

						<Input
							title="Valor total"
							editable={false}
							marginBottom="extraLarge"
							value={productTotal}
							onChangeText={setProductTotal}
						/>

						<Button title="Salvar" onPress={handleSaveProduct} marginBottom="extraLarge" />

						<ProductTable onProductPress={handleProductPress} />
					</Content>
				</KeyboardAvoidingView>
			</ScrollView>
		</Container>
	);
};
