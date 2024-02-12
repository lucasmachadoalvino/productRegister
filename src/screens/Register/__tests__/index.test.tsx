import React from 'react';
import { RegisterScreen } from '..';

import { fireEvent, render, waitFor } from '../../../utils/test-utils';

import * as useUser from '../../../contexts/UserContext';
import * as useUserAlerts from '../../../utils/alerts/useUserAlerts';

const cpfEmptyAlert = jest.fn();
const cpfInvalidAlert = jest.fn();
const passwordEmptyAlert = jest.fn();
const passwordInvalidAlert = jest.fn();

jest.spyOn(useUserAlerts, 'useUserAlert').mockImplementation(
	() =>
		({
			cpfEmptyAlert,
			cpfInvalidAlert,
			passwordEmptyAlert,
			passwordInvalidAlert,
		}) as never
);

const registerUser = jest.fn();

jest.spyOn(useUser, 'useUser').mockImplementation(
	() =>
		({
			registerUser,
		}) as never
);

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

		it('contains a subtitle', () => {
			const { getByText } = renderComponentName();
			const Subtitle = getByText('Realize seu cadastro');

			expect(Subtitle).toBeTruthy();
		});

		it('contains a CPF input', () => {
			const { getByPlaceholderText } = renderComponentName();
			const Input = getByPlaceholderText('Digite seu cpf');

			expect(Input).toBeTruthy();
		});

		it('contains a password input', () => {
			const { getByPlaceholderText } = renderComponentName();
			const Input = getByPlaceholderText('Digite sua senha');

			expect(Input).toBeTruthy();
		});

		it('contains a register button', () => {
			const { getByText } = renderComponentName();
			const Button = getByText('Registrar');

			expect(Button).toBeTruthy();
		});

		it('contains a eye close icon', () => {
			const { getByTestId } = renderComponentName();
			const EyeOpenIcon = getByTestId('EyeCloseRegister');

			expect(EyeOpenIcon).toBeTruthy();
		});

		it('contains a eye open icon', () => {
			const { getByTestId } = renderComponentName();
			const EyeOpenIcon = getByTestId('EyeCloseRegister');

			fireEvent.press(EyeOpenIcon);

			const EyeCloseIcon = getByTestId('EyeOpenRegister');
			expect(EyeCloseIcon).toBeTruthy();
		});
	});

	describe('when the register button is pressed', () => {
		it('should show an alert that you dont have a CPF', () => {
			const { getByText } = renderComponentName();
			const Button = getByText('Registrar');

			fireEvent.press(Button);
			expect(cpfEmptyAlert).toHaveBeenCalled();
		});

		it('should show an alert that you have an invalid CPF', () => {
			const { getByText, getByPlaceholderText } = renderComponentName();
			const cpfInput = getByPlaceholderText('Digite seu cpf');

			fireEvent.changeText(cpfInput, '123');
			const Button = getByText('Registrar');

			fireEvent.press(Button);
			expect(cpfInvalidAlert).toHaveBeenCalled();
		});

		it('should show an alert that you dont have a password', () => {
			const { getByText, getByPlaceholderText } = renderComponentName();
			const cpfInput = getByPlaceholderText('Digite seu cpf');

			fireEvent.changeText(cpfInput, '75186391069');
			const Button = getByText('Registrar');

			fireEvent.press(Button);
			expect(passwordEmptyAlert).toHaveBeenCalled();
		});

		it('should show an alert that you have an invalid password', () => {
			const { getByText, getByPlaceholderText } = renderComponentName();
			const cpfInput = getByPlaceholderText('Digite seu cpf');
			const passwordInput = getByPlaceholderText('Digite sua senha');

			fireEvent.changeText(cpfInput, '75186391069');
			fireEvent.changeText(passwordInput, '123');
			const Button = getByText('Registrar');

			fireEvent.press(Button);
			expect(passwordInvalidAlert).toHaveBeenCalled();
		});

		it('will call registerUser function', () => {
			const { getByText, getByPlaceholderText } = renderComponentName();
			const cpfInput = getByPlaceholderText('Digite seu cpf');
			const passwordInput = getByPlaceholderText('Digite sua senha');

			fireEvent.changeText(cpfInput, '75186391069');
			fireEvent.changeText(passwordInput, '12345678');
			const Button = getByText('Registrar');

			fireEvent.press(Button);
			expect(registerUser).toHaveBeenCalled();
		});
	});

	describe('when the cpf is changed', () => {
		it('should show a text alert that you have an invalid CPF', async () => {
			const { getByPlaceholderText, getByText } = renderComponentName();
			const cpfInput = getByPlaceholderText('Digite seu cpf');

			fireEvent.changeText(cpfInput, '123');

			await waitFor(() => {
				const CpfError = getByText('CPF inválido');
				expect(CpfError).toBeTruthy();
			});
		});
	});

	describe('when the password is changed', () => {
		it('should show a text alert that you have an invalid CPF', async () => {
			const { getByPlaceholderText, getByText } = renderComponentName();
			const passwordInput = getByPlaceholderText('Digite sua senha');

			fireEvent.changeText(passwordInput, '123');

			await waitFor(() => {
				const CpfError = getByText('Senha inválida');
				expect(CpfError).toBeTruthy();
			});
		});
	});
});
