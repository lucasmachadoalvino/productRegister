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
	list: Product[];
	filteredProducts: Product[];
	idCounter: number;
	deletedIds: number[];
}

const initialState: ProductsState = {
	list: [],
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
			console.log('🚀 ~ id:', id);
			console.log('🚀 ~ state.deletedIds:', state.deletedIds);

			if (id) {
				state.list.push({ id, ...action.payload });
			}
		},
		removeProduct: (state, action: PayloadAction<{ productId: string }>) => {
			const id = Number(action.payload.productId);
			state.deletedIds.push(Number(id));
			state.deletedIds.sort((a, b) => a - b);
			state.list = state.list.filter((product) => product.id !== id);
		},
		updateProduct: (state, action: PayloadAction<Product>) => {
			const { id, ...rest } = action.payload;
			const index = state.list.findIndex((product) => product.id === id);

			if (index !== -1) {
				state.list[index] = { ...state.list[index], ...rest };
			}
		},
		findProducts: (state, action: PayloadAction<{ name: string }>) => {
			console.log('🚀 ~ name:', action.payload.name);
			const products = state.list.filter((product) =>
				product.name.toLocaleLowerCase().includes(action.payload.name.toLocaleLowerCase())
			);

			state.filteredProducts = products;
		},
	},
});

const persistConfig = {
	key: '@products',
	storage: AsyncStorage,
};

export const { addProduct, updateProduct, removeProduct, findProducts } = productsSlice.actions;

export const productSliceReducer = persistReducer(persistConfig, productsSlice.reducer);
