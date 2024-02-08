import styled from 'styled-components/native';
import { RnInputProps } from './interfaces';

export const Container = styled.View`
	/* align-self: ; */
	/* align-self:; */
`;

export const RnInput = styled.TextInput<RnInputProps>`
	border: solid 2px ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.small}px;
	padding: ${({ theme }) => theme.space.default}px;
	font-size: ${({ theme }) => theme.fontSize.default}px;
	font-weight: ${({ theme }) => theme.fontWeight.medium};
	margin-bottom: ${({ theme, marginBottom }) => (marginBottom ? theme.space[marginBottom] : 0)}px;
	margin-top: ${({ theme, marginTop }) => (marginTop ? theme.space[marginTop] : 0)}px;
`;
