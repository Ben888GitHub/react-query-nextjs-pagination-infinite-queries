import { Pagination } from '@material-ui/lab';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFetchCharacters } from '../hooks/useApi';
import { dehydrate, QueryClient } from 'react-query';
import axios from 'axios';

function PaginationSSG() {
	const router = useRouter();

	const [page, setPage] = useState(parseInt(router.query.page) || 1);
	const { data } = useFetchCharacters(page);

	const handlePaginationChange = async (e, value) => {
		// console.log(value);
		setPage(value);
		router.push(`/paginationSSG?page=${value}`, undefined, { shallow: true });
	};

	return (
		<div>
			<h1>Pagination SSG</h1>

			<Pagination
				count={data?.info.pages}
				variant="outlined"
				color="primary"
				className="pagination"
				page={page}
				onChange={handlePaginationChange}
			/>
			<div className="grid-container">
				{data?.results?.map((character) => (
					<article key={character.id}>
						{/* <Image
							src={character.image}
							alt={character.name}
							height={250}
							// loading="lazy"
							width={'100%'}
							priority
						/> */}
						<img
							src={character.image}
							alt={character.name}
							height={250}
							loading="lazy"
							width={'100%'}
						/>
						<div className="text">
							<p>Name: {character.name}</p>
							<p>Lives in: {character.location.name}</p>
							<p>Species: {character.species}</p>
							<i>Id: {character.id} </i>
						</div>
					</article>
				))}
			</div>
			<Pagination
				count={data?.info.pages}
				variant="outlined"
				color="primary"
				className="pagination"
				page={page}
				onChange={handlePaginationChange}
			/>
		</div>
	);
}

export default PaginationSSG;

export const getServerSideProps = async (context) => {
	let page = 1;
	if (context.query.page) {
		page = parseInt(context.query.page);
	}

	const fetchChars = async () => {
		const { data } = await axios.get(
			`https://rickandmortyapi.com/api/character/?page=${page}`
		);
		return data;
	};
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['characters', page], fetchChars);

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};
