import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

interface UserProviderProps {
	children: React.ReactNode;
}

interface UserContextType {
	cpf: string;
	registerUser: (cpf: string, password: string) => void;
	isLoadingUser: boolean;
	validadeLogin: (userCpf: string, userPassword: string) => boolean;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: UserProviderProps) => {
	const [cpf, setCpf] = useState('');
	const [password, setPassword] = useState('');
	const [isLoadingUser, setIsLoadingUser] = useState(true);

	useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		const savedCpf = (await AsyncStorage.getItem('@cpf')) as string;
		setCpf(savedCpf);

		const savedPassword = (await AsyncStorage.getItem('@password')) as string;
		setPassword(savedPassword);

		setIsLoadingUser(false);
	};

	const registerUser = async (cpf: string, password: string) => {
		await AsyncStorage.setItem('@cpf', cpf);
		await AsyncStorage.setItem('@password', password);

		setCpf(cpf);
		setPassword(password);
	};

	const validadeLogin = (userCpf: string, userPassword: string) => {
		return userCpf === cpf && userPassword === password;
	};

	return (
		<UserContext.Provider
			value={{
				cpf,
				registerUser,
				isLoadingUser,
				validadeLogin,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	return useContext(UserContext);
};
