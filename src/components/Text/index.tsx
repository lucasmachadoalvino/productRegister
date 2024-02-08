import { CustomTextProps } from './interfaces';
import { RnText } from './styles';

export const Text = ({
	children,
	fontSize = 'default',
	fontWeight = 'regular',
	...rest
}: CustomTextProps) => {
	return (
		<RnText fontSize={fontSize} fontWeight={fontWeight} {...rest}>
			{children}
		</RnText>
	);
};
