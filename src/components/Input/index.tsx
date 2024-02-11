import React from 'react';
import { useTheme } from 'styled-components/native';
import { Text } from '../Text';
import { InputProps } from './interfaces';
import { Container, Content, IconContent, RnInput } from './styles';

export const Input = ({
	title,
	errorMessage,
	marginBottom,
	marginTop,
	rightIcon,
	rightIconOnPress,
	...rest
}: InputProps) => {
	const theme = useTheme();
	return (
		<Container marginBottom={marginBottom} marginTop={marginTop}>
			{title && (
				<Text fontSize="medium" fontWeight="medium" marginBottom="small">
					{title}
				</Text>
			)}
			<Content>
				<RnInput placeholderTextColor={theme.colors.text} {...rest} />
				{rightIcon && (
					<IconContent
						testID="rightIcon"
						onPress={rightIconOnPress}
						hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
					>
						{rightIcon}
					</IconContent>
				)}
			</Content>

			{errorMessage && (
				<Text fontSize="default" marginBottom={marginBottom} marginTop="small">
					{errorMessage}
				</Text>
			)}
		</Container>
	);
};
