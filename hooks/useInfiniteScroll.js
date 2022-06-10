import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

const fetchCharacters = async ({ pageParam = 1 }) => {
	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/character/?page=${pageParam}`
	);
	return data;
};

export const useInfiniteScroll = () => {
	return useInfiniteQuery(['characters'], fetchCharacters, {
		refetchOnWindowFocus: false,
		getNextPageParam: (lastPage, pages) =>
			lastPage.info.next && pages.length + 1
	});
};
