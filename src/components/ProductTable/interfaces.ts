import { Product } from '../../store/features/products/produtSlice';

export interface ProductTableProps {
	onProductPress: (product: Product) => void;
}
