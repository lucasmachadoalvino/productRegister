import { HomeScreen } from '..';
import * as X from '../../../store/features/products/produtSlice';
import * as useProductAlerts from '../../../utils/alerts/useProductAlerts';
import { fireEvent, render } from '../../../utils/test-utils';

const productNameEmptyAlert = jest.fn();
const productQuantityEmptyAlert = jest.fn();
const productValueEmptyAlert = jest.fn();

jest.spyOn(useProductAlerts, 'useProductAlert').mockImplementation(
	() =>
		({
			productNameEmptyAlert,
			productQuantityEmptyAlert,
			productValueEmptyAlert,
		}) as never
);

function renderHome() {
	return render(<HomeScreen />);
}

describe('Home', () => {
	describe('when the component is rendered', () => {
		it('contains a title', () => {
			const { getByTestId } = renderHome();
			const ConfigButton = getByTestId('ConfigButton');

			expect(ConfigButton).toBeTruthy();
		});

		it('contains a search product input', () => {
			const { getByPlaceholderText } = renderHome();
			const Input = getByPlaceholderText('Buscar Produto');

			expect(Input).toBeTruthy();
		});

		it('contains a search product icon', () => {
			const { getByTestId } = renderHome();
			const Icon = getByTestId('SearchProductIcon');

			expect(Icon).toBeTruthy();
		});

		it('contains a name input', () => {
			const { getByPlaceholderText } = renderHome();
			const Input = getByPlaceholderText('Digite o nome do produto');

			expect(Input).toBeTruthy();
		});

		it('contains a stock input', () => {
			const { getByPlaceholderText } = renderHome();
			const Input = getByPlaceholderText('Digite a quantidade em estoque');

			expect(Input).toBeTruthy();
		});

		it('contains a value input', () => {
			const { getByPlaceholderText } = renderHome();
			const Input = getByPlaceholderText('Digite o valor unitário');

			expect(Input).toBeTruthy();
		});

		it('contains a total input', () => {
			const { getByTestId } = renderHome();
			const Input = getByTestId('ProductTotalInput');

			expect(Input).toBeTruthy();
		});

		it('contains a save button', () => {
			const { getByText } = renderHome();
			const Button = getByText('Salvar');

			expect(Button).toBeTruthy();
		});

		it('contains a product table', () => {
			const { getByTestId } = renderHome();
			const ProductTable = getByTestId('ProductTable');

			expect(ProductTable).toBeTruthy();
		});
	});

	describe('when the save button is pressed', () => {
		it('should show an alert that you dont have a product name', () => {
			const { getByText } = renderHome();
			const Button = getByText('Salvar');

			fireEvent.press(Button);
			expect(productNameEmptyAlert).toHaveBeenCalled();
		});

		it('should show an alert that you dont have a product value', () => {
			const { getByText, getByPlaceholderText } = renderHome();

			const Input = getByPlaceholderText('Digite o nome do produto');
			fireEvent.changeText(Input, 'Product Name');

			const Button = getByText('Salvar');
			fireEvent.press(Button);

			expect(productValueEmptyAlert).toHaveBeenCalled();
		});

		it('should show an alert that you dont have a product quantity', () => {
			const { getByText, getByPlaceholderText } = renderHome();

			const Input = getByPlaceholderText('Digite o nome do produto');
			fireEvent.changeText(Input, 'Product Name');

			const Input2 = getByPlaceholderText('Digite o valor unitário');
			fireEvent.changeText(Input2, '10');

			const Button = getByText('Salvar');
			fireEvent.press(Button);

			expect(productQuantityEmptyAlert).toHaveBeenCalled();
		});

		it('will save product', () => {
			const AddProductSpy = jest.spyOn(X, 'addProduct');
			const { getByText, getByPlaceholderText } = renderHome();

			const Input = getByPlaceholderText('Digite o nome do produto');
			fireEvent.changeText(Input, 'Product Name');

			const Input2 = getByPlaceholderText('Digite o valor unitário');
			fireEvent.changeText(Input2, '10');

			const Input3 = getByPlaceholderText('Digite a quantidade em estoque');
			fireEvent.changeText(Input3, '10');

			const Button = getByText('Salvar');
			fireEvent.press(Button);

			expect(AddProductSpy).toHaveBeenCalledWith({
				name: 'Product Name',
				stock: 10,
				total: 100,
				value: 10,
			});
		});
	});
});
