import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import '@testing-library/jest-native/extend-expect';
import { LogBox } from 'react-native';

doMocks();
ignoreLogs();

jest.useFakeTimers();

// configure({ adapter: new Adapter() });

function doMocks() {
	jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
}

function ignoreLogs() {
	LogBox.ignoreAllLogs();
	console.error = (message) => {
		return message;
	};
}
