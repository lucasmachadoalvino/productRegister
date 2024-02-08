export const useFormat = () => {
	function formatCpf(cpf: string) {
		cpf = cpf
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		return cpf;
	}

	return { formatCpf };
};
