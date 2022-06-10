import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCharacters = async ({ queryKey }) => {
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/character/?page=${queryKey[1]}`
	);
	return data;
};

const useFetchCharacters = (page) => {
	return useQuery(['characters', page], fetchCharacters, {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	});
};

export { useFetchCharacters, fetchCharacters };
