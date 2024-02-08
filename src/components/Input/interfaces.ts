import { TextInputProps } from 'react-native';
import { Space } from '../../utils/types';

export interface InputProps extends TextInputProps {
	title: string;
	errorMessage?: string;
	marginTop?: Space;
	marginBottom?: Space;
}

export interface RnInputProps {
	marginTop?: Space;
	marginBottom?: Space;
}
