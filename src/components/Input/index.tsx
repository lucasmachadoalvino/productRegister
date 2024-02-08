import React from 'react';
import { useTheme } from 'styled-components';
import { Text } from '../Text';
import { InputProps } from './interfaces';
import { Container, RnInput } from './styles';

export const Input = ({ title, errorMessage, marginBottom, ...rest }: InputProps) => {
	const theme = useTheme();

	return (
		<Container>
			<Text fontSize="medium" fontWeight="medium" marginBottom="small">
				{title}
			</Text>
			<RnInput
				placeholderTextColor={theme.colors.border}
				marginBottom={errorMessage ? undefined : marginBottom}
				{...rest}
			/>
			{errorMessage && (
				<Text fontSize="default" marginBottom={marginBottom} marginTop="small">
					{errorMessage}
				</Text>
			)}
		</Container>
	);
};
