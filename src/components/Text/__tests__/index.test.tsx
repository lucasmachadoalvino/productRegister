import React from 'react';
import { Text } from '..';
import { render } from '../../../utils/test-utils';

function renderText() {
	return render(<Text>Fake Text</Text>);
}

describe('Text', () => {
	describe('when the component is rendered', () => {
		it('contains a text', () => {
			const { getByText } = renderText();
			const Title = getByText('Fake Text');

			expect(Title).toBeTruthy();
		});
	});
});
