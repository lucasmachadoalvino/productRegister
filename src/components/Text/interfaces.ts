import { ReactNode } from 'react';
import { FontSize, FontWeights, Space } from '../../utils/types';

export interface CustomTextProps {
	children: ReactNode;
	fontSize?: FontSize;
	fontWeight?: FontWeights;
	marginTop?: Space;
	marginBottom?: Space;
	marginLeft?: Space;
	marginRight?: Space;
}

export interface RnTextProps {
	fontSize: FontSize;
	fontWeight: FontWeights;
	marginTop?: Space;
	marginBottom?: Space;
	marginLeft?: Space;
	marginRight?: Space;
}
