import styled from 'styled-components/native';
import { RnInputProps } from './interfaces';

export const Container = styled.View<RnInputProps>`
	margin-bottom: ${({ theme, marginBottom }) => (marginBottom ? theme.space[marginBottom] : 0)}px;
	margin-top: ${({ theme, marginTop }) => (marginTop ? theme.space[marginTop] : 0)}px;
`;

export const RnInput = styled.TextInput`
	font-size: ${({ theme }) => theme.fontSize.default}px;
	font-weight: ${({ theme }) => theme.fontWeight.medium};
	color: ${({ theme }) => theme.colors.text};
	flex: 1;
`;

export const Content = styled.View`
	padding: ${({ theme }) => theme.space.default}px;
	border: solid 2px ${({ theme }) => theme.colors.border};
	flex-direction: row;
	align-items: center;
	border-radius: ${({ theme }) => theme.borderRadius.small}px;
`;

export const IconContent = styled.TouchableOpacity`
	margin-left: ${({ theme }) => theme.space.default}px;
`;
