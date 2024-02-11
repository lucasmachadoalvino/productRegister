// Configuration docs: https://jestjs.io/docs/pt-BR/configuration
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
	...tsjPreset,
	preset: 'react-native',
	testRegex: '((\\.|/)(test))\\.tsx?$',
	testEnvironment: 'node',
	verbose: false,
	setupFilesAfterEnv: ['<rootDir>/setupTests.js', '@testing-library/jest-native/extend-expect'],
	transform: {
		...tsjPreset.transform,
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
		'^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: './tsconfig.json',
				babelConfig: true,
				isolateModule: true,
				diagnostics: false,
			},
		],
	},
	rootDir: '.',
	testPathIgnorePatterns: ['/node_modules/'],
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
	moduleNameMapper: {
		'\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
	},
	transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native|react)/)'],
};
