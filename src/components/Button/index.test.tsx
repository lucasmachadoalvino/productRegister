import React from 'react';
import { Button } from '.';
import { fireEvent, render } from '../../utils/test-utils';
import { ButtonProps } from './interfaces';

const defaultProps: ButtonProps = {
	title: 'fake Title',
	onPress: jest.fn(),
};

function renderButton() {
	return render(<Button {...defaultProps} />);
}

describe('Button', () => {
	describe('when the component is rendered', () => {
		it('contains a title', () => {
			const { getByText } = renderButton();
			const Title = getByText(defaultProps.title);

			expect(Title).toBeTruthy();
		});
	});

	describe('when the component is pressed', () => {
		it('calls the onPress function', () => {
			const { getByText } = renderButton();
			const Title = getByText(defaultProps.title);

			fireEvent.press(Title);

			expect(defaultProps.onPress).toHaveBeenCalled();
		});
	});
});
