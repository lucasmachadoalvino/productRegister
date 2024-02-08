export const useValidade = () => {
	function validateCpf(cpf: string) {
		if (typeof cpf !== 'string') return false;

		const cpfNumbersOnly = cpf.replace(/[^\d]+/g, '');
		if (cpfNumbersOnly.length !== 11 || !!cpfNumbersOnly.match(/(\d)\1{10}/)) return false;

		const cpfArray = cpfNumbersOnly.split('').map((number) => +number);

		const rest = (count: number) =>
			((cpfArray.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) *
				10) %
				11) %
			10;

		return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
	}

	return { validateCpf };
};
