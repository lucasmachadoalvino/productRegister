import { Space } from '../../utils/types';

export interface ButtonProps {
	title: string;
	onPress: () => void;
	marginTop?: Space;
	marginBottom?: Space;
}

export interface ButtonContainerProps {
	marginTop?: Space;
	marginBottom?: Space;
}
