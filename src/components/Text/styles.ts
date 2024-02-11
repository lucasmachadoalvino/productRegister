import styled from 'styled-components/native';
import { RnTextProps } from './interfaces';

export const RnText = styled.Text<RnTextProps>`
	color: ${({ theme }) => theme.colors.text};
	font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]}px;
	font-weight: ${({ theme, fontWeight }) => theme.fontWeight[fontWeight]};
	margin-bottom: ${({ theme, marginBottom }) => (marginBottom ? theme.space[marginBottom] : 0)}px;
	margin-top: ${({ theme, marginTop }) => (marginTop ? theme.space[marginTop] : 0)}px;
	margin-left: ${({ theme, marginLeft }) => (marginLeft ? theme.space[marginLeft] : 0)}px;
	margin-right: ${({ theme, marginRight }) => (marginRight ? theme.space[marginRight] : 0)}px;
`;
