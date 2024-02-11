import styled from 'styled-components/native';
import { Text } from '../Text';

export const Container = styled.View``;

export const Header = styled.View`
	flex-direction: row;
	background-color: ${({ theme }) => theme.colors.button};
`;

export const HeaderText = styled(Text)`
	color: ${({ theme }) => theme.colors.tableHeader};
`;

export const DataRow = styled.TouchableOpacity`
	flex-direction: row;
`;

const DefaultCell = styled.View`
	padding: ${({ theme }) => theme.space.default}px;
	border: solid 1px ${({ theme }) => theme.colors.text};
`;

export const IdCell = styled(DefaultCell)`
	width: 50px;
`;

export const NameCell = styled(DefaultCell)`
	width: 300px;
`;

export const QuantityCell = styled(DefaultCell)`
	width: 100px;
`;
