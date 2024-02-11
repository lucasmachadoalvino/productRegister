import React from 'react';
import { RegisterScreen } from '..';

import { render } from '../../../utils/test-utils';

function renderComponentName() {
	return render(<RegisterScreen />);
}

describe('ComponentName', () => {
	describe('when the component is rendered', () => {
		it('contains a title', () => {
			const { getByText } = renderComponentName();
			const Title = getByText('Bem-vindo!');

			expect(Title).toBeTruthy();
		});
	});

	// describe('when the component is pressed', () => {
	// 	it('calls the onPress function', () => {
	// 		const { getByText } = renderComponentName(mockName);
	// 		const Title = getByText(mockName.title);

	// 		fireEvent.press(Title);

	// 		expect(mockName.onPress).toHaveBeenCalled();
	// 	});
	// });
});
