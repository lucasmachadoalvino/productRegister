// reduxSlice.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

export interface Product {
	id: number;
	name: string;
	stock: number;
	value: number;
	total: number;
}

interface ProductsState {
	products: Product[];
	filteredProducts: Product[];
	idCounter: number;
	deletedIds: number[];
}

const initialState: ProductsState = {
	products: [],
	idCounter: 1,
	deletedIds: [],
	filteredProducts: [],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
			const id = state.deletedIds.length > 0 ? state.deletedIds.shift() : state.idCounter++;

			if (id) {
				state.products.push({ id, ...action.payload });
			}
		},
		removeProduct: (state, action: PayloadAction<{ productId: string }>) => {
			const id = Number(action.payload.productId);
			state.deletedIds.push(Number(id));
			state.deletedIds.sort((a, b) => a - b);
			state.products = state.products.filter((product) => product.id !== id);
		},
		updateProduct: (state, action: PayloadAction<Product>) => {
			const { id, ...rest } = action.payload;
			const index = state.products.findIndex((product) => product.id === id);

			if (index !== -1) {
				state.products[index] = { ...state.products[index], ...rest };
			}
		},
		findProducts: (state, action: PayloadAction<{ name: string }>) => {
			const products = state.products.filter((product) =>
				product.name.toLocaleLowerCase().includes(action.payload.name.toLocaleLowerCase())
			);

			state.filteredProducts = products;
		},
		orderProducts: (state, action: PayloadAction<keyof Product>) => {
			const orderBy = action.payload;

			const comparator = (a: Product, b: Product) => {
				if (a[orderBy] < b[orderBy]) {
					return -1;
				}
				if (a[orderBy] > b[orderBy]) {
					return 1;
				}
				return 0;
			};

			state.products.sort(comparator);
			state.filteredProducts.sort(comparator);
		},
	},
});

const persistConfig = {
	key: '@products',
	storage: AsyncStorage,
};

export const { addProduct, updateProduct, removeProduct, findProducts, orderProducts } =
	productsSlice.actions;

export const productSliceReducer = persistReducer(persistConfig, productsSlice.reducer);
