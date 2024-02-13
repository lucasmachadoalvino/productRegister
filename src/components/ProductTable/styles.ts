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

const DefaultCell = styled.TouchableOpacity`
	padding: ${({ theme }) => theme.space.default}px;
	border: solid 1px ${({ theme }) => theme.colors.text};
`;

const DefaultData = styled.View`
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

export const IdData = styled(DefaultData)`
	width: 50px;
`;

export const NameData = styled(DefaultData)`
	width: 300px;
`;

export const QuantityData = styled(DefaultData)`
	width: 100px;
`;
