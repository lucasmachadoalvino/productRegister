import React from 'react';

import { SettingsScreen } from '..';
import * as useThemeContext from '../../../theming/Theme';
import { fireEvent, render } from '../../../utils/test-utils';

function renderSettings() {
	return render(<SettingsScreen />);
}

describe('Settings', () => {
	describe('when the component is rendered', () => {
		it('contains a title', () => {
			const { getByText } = renderSettings();
			const Title = getByText('Settings');

			expect(Title).toBeTruthy();
		});

		it('contains a back icon', () => {
			const { getByTestId } = renderSettings();
			const Icon = getByTestId('SettingsBackIcon');

			expect(Icon).toBeTruthy();
		});

		it('contains a switch', () => {
			const { getByTestId } = renderSettings();
			const Switch = getByTestId('SettingsSwitch');

			expect(Switch).toBeTruthy();
		});

		it('contains a switch label', () => {
			const { getByText } = renderSettings();
			const Label = getByText('Modo escuro');

			expect(Label).toBeTruthy();
		});
	});

	describe('when the switch is pressed', () => {
		it('calls the toggleTheme function', async () => {
			const mockedToggleTheme = jest.fn();

			jest.spyOn(useThemeContext, 'useThemeContext').mockReturnValue({
				toggleTheme: mockedToggleTheme,
				theme: 'light',
			} as never);

			const { getByTestId } = renderSettings();
			const Switch = getByTestId('SettingsSwitch');

			fireEvent(Switch, 'onValueChange', true);

			expect(mockedToggleTheme).toHaveBeenCalled();
		});
	});
});
