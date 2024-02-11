import React from 'react';
import { ProductTable } from '..';
import * as StoreHook from '../../../store/hooks';
import { fireEvent, render } from '../../../utils/test-utils';
import { ProductTableProps } from '../interfaces';

export const defaultProductTableProps: ProductTableProps = {
	onProductPress: jest.fn(),
};

function renderProductTable() {
	return render(<ProductTable {...defaultProductTableProps} />);
}

jest
	.spyOn(StoreHook, 'useAppSelector')
	.mockReturnValue([{ id: 1, name: 'Product 1', stock: 10, value: 11, total: 100 }]);

describe('ProductTable', () => {
	describe('when the component is rendered', () => {
		it('contains a head id', () => {
			const { getByText } = renderProductTable();
			const Id = getByText('ID');

			expect(Id).toBeTruthy();
		});

		it('contains a head Name', () => {
			const { getByText } = renderProductTable();
			const Name = getByText('Name');

			expect(Name).toBeTruthy();
		});

		it('contains a head quantity', () => {
			const { getByText } = renderProductTable();
			const Quantity = getByText('Estoque');

			expect(Quantity).toBeTruthy();
		});

		it('contains a head value', () => {
			const { getByText } = renderProductTable();
			const Value = getByText('Valor');

			expect(Value).toBeTruthy();
		});

		it('contains a head total', () => {
			const { getByText } = renderProductTable();
			const Total = getByText('Total');

			expect(Total).toBeTruthy();
		});
	});

	describe('when the component is rendered with data', () => {
		it('contains a product id', () => {
			const { getByText } = renderProductTable();
			const Id = getByText('1');

			expect(Id).toBeTruthy();
		});

		it('contains a product name', () => {
			const { getByText } = renderProductTable();
			const Name = getByText('Product 1');

			expect(Name).toBeTruthy();
		});

		it('contains a product stock', () => {
			const { getByText } = renderProductTable();
			const Stock = getByText('10');

			expect(Stock).toBeTruthy();
		});

		it('contains a product value', () => {
			const { getByText } = renderProductTable();
			const Value = getByText('11');

			expect(Value).toBeTruthy();
		});

		it('contains a product total', () => {
			const { getByText } = renderProductTable();
			const Total = getByText('100');

			expect(Total).toBeTruthy();
		});
	});

	describe('when the component is pressed', () => {
		it('calls the onProductPress function', () => {
			const { getByText } = renderProductTable();
			const Id = getByText('1');

			fireEvent.press(Id);

			expect(defaultProductTableProps.onProductPress).toHaveBeenCalled();
		});
	});
});
