import styled from 'styled-components/native';
import { Text } from '../Text';
import { ButtonContainerProps } from './interfaces';

export const Container = styled.TouchableOpacity<ButtonContainerProps>`
	background-color: ${({ theme, marginTop }) => theme.colors.button};
	align-items: center;
	padding: 12px;
	border-radius: 4px;
	margin-bottom: ${({ theme, marginBottom }) => (marginBottom ? theme.space[marginBottom] : 0)}px;
	margin-top: ${({ theme, marginTop }) => (marginTop ? theme.space[marginTop] : 0)}px;
	/* justify-self: flex-start; */
	/* align-self: center; */
`;

export const Title = styled(Text).attrs({
	fontSize: 'large',
	fontWeight: 'semiBold',
})`
	color: #ffffff;
`;
