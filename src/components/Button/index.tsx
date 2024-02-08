import { ButtonProps } from './interfaces';
import { Container, Title } from './styles';

export const Button = ({ title, ...rest }: ButtonProps) => {
	return (
		<Container {...rest}>
			<Title fontSize="large" fontWeight="semiBold">
				{title}
			</Title>
		</Container>
	);
};
