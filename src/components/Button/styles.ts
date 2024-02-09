import styled from 'styled-components/native';
import { Text } from '../Text';
import { ButtonContainerProps } from './interfaces';

export const Container = styled.TouchableOpacity<ButtonContainerProps>`
	background-color: ${({ theme }) => theme.colors.button};
	align-items: center;
	padding: ${({ theme }) => theme.space.default}px;
	border-radius: ${({ theme }) => theme.borderRadius.small}px;
	margin-bottom: ${({ theme, marginBottom }) => (marginBottom ? theme.space[marginBottom] : 0)}px;
	margin-top: ${({ theme, marginTop }) => (marginTop ? theme.space[marginTop] : 0)}px;
`;

export const Title = styled(Text).attrs({
	fontSize: 'large',
	fontWeight: 'semiBold',
})`
	color: ${({ theme }) => theme.colors.background};
`;
