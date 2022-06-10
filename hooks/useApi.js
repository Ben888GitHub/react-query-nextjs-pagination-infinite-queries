import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCharacters = async (page) => {
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/character/?page=${page}`
	);
	return data;
};

const useFetchCharacters = (page) => {
	return useQuery(['characters', page], () => fetchCharacters(page), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	});
};

export { useFetchCharacters, fetchCharacters };
