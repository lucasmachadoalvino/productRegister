import React from 'react';
import { Input } from '..';
import { fireEvent, render } from '../../../utils/test-utils';
import { InputProps } from '../interfaces';

function renderInput(props: InputProps) {
	return render(<Input {...props} />);
}

describe('Input', () => {
	describe('when the component is rendered', () => {
		it('contains a title', () => {
			const { getByText } = renderInput({ title: 'fake Title' });
			const Title = getByText('fake Title');

			expect(Title).toBeTruthy();
		});

		it('contains a placeholder', () => {
			const { getByPlaceholderText } = renderInput({ placeholder: 'fake Placeholder' });
			const Placeholder = getByPlaceholderText('fake Placeholder');

			expect(Placeholder).toBeTruthy();
		});

		it('contains a rightIcon', () => {
			const { getByTestId } = renderInput({ rightIcon: <></> });
			const RightIcon = getByTestId('rightIcon');

			expect(RightIcon).toBeTruthy();
		});

		it('contains an errorMessage', () => {
			const { getByText } = renderInput({ errorMessage: 'fake Error' });
			const ErrorMessage = getByText('fake Error');

			expect(ErrorMessage).toBeTruthy();
		});
	});

	describe('when the rightIcon is pressed', () => {
		it('calls the rightIconOnPress function', () => {
			const props = { rightIconOnPress: jest.fn(), rightIcon: <></> };
			const { getByTestId } = renderInput(props);
			const RightIcon = getByTestId('rightIcon');

			fireEvent.press(RightIcon);

			expect(props.rightIconOnPress).toHaveBeenCalled();
		});
	});
});
