import { Row } from 'react-native-table-component';
import styled from 'styled-components/native';
import { Text } from '../Text';

export const Container = styled.View``;

export const TableRow = styled(Row).attrs({
	textStyle: {
		color: 'red',
	},
})`
	background-color: ${({ theme }) => theme.colors.button};
	width: 500px;
`;

export const HeadTitle = styled(Text).attrs({
	fontSize: 'default',
	fontWeight: 'semiBold',
})`
	color: ${({ theme }) => theme.colors.background};
	border: ${({ theme }) => theme.colors.background};
	padding: ${({ theme }) => theme.space.default}px;
	text-align: center;
`;
