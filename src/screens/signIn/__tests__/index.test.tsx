import React from 'react';

import { SignInScreen } from '..';
import { fireEvent, render, waitFor } from '../../../utils/test-utils';

import * as useUser from '../../../contexts/UserContext';
import * as useUserAlerts from '../../../utils/alerts/useUserAlerts';

const cpfEmptyAlert = jest.fn();
const cpfInvalidAlert = jest.fn();
const passwordEmptyAlert = jest.fn();
const passwordInvalidAlert = jest.fn();
const loginInvalidAlert = jest.fn();

jest.spyOn(useUserAlerts, 'useUserAlert').mockImplementation(
	() =>
		({
			cpfEmptyAlert,
			cpfInvalidAlert,
			passwordEmptyAlert,
			passwordInvalidAlert,
			loginInvalidAlert,
		}) as never
);

const mockNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
	return {
		...jest.requireActual('@react-navigation/native'),
		useNavigation: () => ({
			reset: mockNavigation,
		}),
	};
});

function renderSignIn() {
	return render(<SignInScreen />);
}

describe('SignIn', () => {
	describe('when the component is rendered', () => {
		it('contains a title', () => {
			const { getByText } = renderSignIn();
			const Title = getByText('Bem-vindo!');

			expect(Title).toBeTruthy();
		});

		it('contains a subtitle', () => {
			const { getByText } = renderSignIn();
			const Subtitle = getByText('Faça login na sua conta');

			expect(Subtitle).toBeTruthy();
		});

		it('contains a CPF input', () => {
			const { getByPlaceholderText } = renderSignIn();
			const Input = getByPlaceholderText('Digite seu cpf');

			expect(Input).toBeTruthy();
		});

		it('contains a password input', () => {
			const { getByPlaceholderText } = renderSignIn();
			const Input = getByPlaceholderText('Digite sua senha');

			expect(Input).toBeTruthy();
		});

		it('contains a register button', () => {
			const { getByText } = renderSignIn();
			const Button = getByText('Entrar');

			expect(Button).toBeTruthy();
		});

		it('contains a eye close icon', () => {
			const { getByTestId } = renderSignIn();
			const EyeOpenIcon = getByTestId('EyeCloseSignIn');

			expect(EyeOpenIcon).toBeTruthy();
		});

		it('contains a eye open icon', () => {
			const { getByTestId } = renderSignIn();
			const EyeOpenIcon = getByTestId('EyeCloseSignIn');

			fireEvent.press(EyeOpenIcon);

			const EyeCloseIcon = getByTestId('EyeOpenSignIn');
			expect(EyeCloseIcon).toBeTruthy();
		});
	});

	describe('when the register button is pressed', () => {
		it('should show an alert that you dont have a CPF', () => {
			const { getByText } = renderSignIn();
			const Button = getByText('Entrar');

			fireEvent.press(Button);
			expect(cpfEmptyAlert).toHaveBeenCalled();
		});

		it('should show an alert that you have an invalid CPF', () => {
			const { getByText, getByPlaceholderText } = renderSignIn();
			const cpfInput = getByPlaceholderText('Digite seu cpf');

			fireEvent.changeText(cpfInput, '123');
			const Button = getByText('Entrar');

			fireEvent.press(Button);
			expect(cpfInvalidAlert).toHaveBeenCalled();
		});

		it('should show an alert that you dont have a password', () => {
			const { getByText, getByPlaceholderText } = renderSignIn();
			const cpfInput = getByPlaceholderText('Digite seu cpf');

			fireEvent.changeText(cpfInput, '75186391069');
			const Button = getByText('Entrar');

			fireEvent.press(Button);
			expect(passwordEmptyAlert).toHaveBeenCalled();
		});

		it('should show an alert that you have an invalid password', () => {
			const { getByText, getByPlaceholderText } = renderSignIn();
			const cpfInput = getByPlaceholderText('Digite seu cpf');
			const passwordInput = getByPlaceholderText('Digite sua senha');

			fireEvent.changeText(cpfInput, '75186391069');
			fireEvent.changeText(passwordInput, '123');
			const Button = getByText('Entrar');

			fireEvent.press(Button);
			expect(passwordInvalidAlert).toHaveBeenCalled();
		});

		it('should show an alert that you have an invalid login', () => {
			jest.spyOn(useUser, 'useUser').mockImplementation(
				() =>
					({
						validadeLogin: () => false,
					}) as never
			);

			const { getByText, getByPlaceholderText } = renderSignIn();
			const cpfInput = getByPlaceholderText('Digite seu cpf');
			const passwordInput = getByPlaceholderText('Digite sua senha');

			fireEvent.changeText(cpfInput, '75186391069');
			fireEvent.changeText(passwordInput, '12345678');
			const Button = getByText('Entrar');

			fireEvent.press(Button);

			expect(loginInvalidAlert).toHaveBeenCalled();
		});

		it('will navigate to home', () => {
			jest.spyOn(useUser, 'useUser').mockImplementation(
				() =>
					({
						validadeLogin: () => true,
					}) as never
			);

			const { getByText, getByPlaceholderText } = renderSignIn();
			const cpfInput = getByPlaceholderText('Digite seu cpf');
			const passwordInput = getByPlaceholderText('Digite sua senha');

			fireEvent.changeText(cpfInput, '75186391069');
			fireEvent.changeText(passwordInput, '12345678');

			const Button = getByText('Entrar');
			fireEvent.press(Button);

			expect(mockNavigation).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Home' }] });
		});
	});

	describe('when the cpf is changed', () => {
		it('should show a text alert that you have an invalid CPF', async () => {
			const { getByPlaceholderText, getByText } = renderSignIn();
			const cpfInput = getByPlaceholderText('Digite seu cpf');

			fireEvent.changeText(cpfInput, '123');

			await waitFor(() => {
				const CpfError = getByText('CPF inválido');
				expect(CpfError).toBeTruthy();
			});
		});
	});

	describe('when the password is changed', () => {
		it('should show a text alert that you have an invalid password', async () => {
			const { getByPlaceholderText, getByText } = renderSignIn();
			const passwordInput = getByPlaceholderText('Digite sua senha');

			fireEvent.changeText(passwordInput, '123');

			await waitFor(() => {
				const CpfError = getByText('Senha inválida');
				expect(CpfError).toBeTruthy();
			});
		});
	});
});
