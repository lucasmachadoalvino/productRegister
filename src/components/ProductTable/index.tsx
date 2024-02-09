import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Cell, Table, TableWrapper } from 'react-native-table-component';
import { Container, HeadTitle, TableRow } from './styles';

export const ProductTable = () => {
	const element = (index) => (
		<TouchableOpacity onPress={() => alertIndex(index)}>
			<Text>{index}</Text>
		</TouchableOpacity>
	);

	const Head = (title: string) => {
		return (
			<TouchableOpacity onPress={() => alertIndex(index)}>
				{/* <View style={styles.head}> */}
				<HeadTitle>{title}</HeadTitle>
				{/* </View> */}
			</TouchableOpacity>
		);
	};

	const state = {
		tableHead: [Head('Id'), Head('Nome'), Head('Estoque'), Head('Valor'), Head('Total')],
		tableData: [
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
			['1', '2', '3', '4', '5'],
		],
	};

	const alertIndex = (index) => {
		Alert.alert(`This is row ${index + 1}`);
	};

	return (
		<ScrollView horizontal>
			<Container>
				<Table>
					<TableRow data={state.tableHead} textStyle={styles.text} />
					{state.tableData.map((rowData, index) => (
						<TableWrapper key={index} style={styles.row}>
							{rowData.map((cellData, cellIndex) => (
								<Cell key={cellIndex} data={element(cellData, index)} textStyle={styles.text} />
							))}
						</TableWrapper>
					))}
				</Table>
			</Container>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	// head: { height: 40, backgroundColor: '#808B97' },
	text: { margin: 6, color: 'red' },
	row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
	btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
	btnText: { textAlign: 'center', color: '#fff' },
});
