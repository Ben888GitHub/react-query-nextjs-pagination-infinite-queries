import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useFetchCharacters, fetchCharacters } from '../hooks/useApi';
import { dehydrate, QueryClient } from 'react-query';

function PaginationSSR() {
	const router = useRouter();

	const [page, setPage] = useState(parseInt(router.query.page) || 1);
	const { data, isPreviousData } = useFetchCharacters(page);

	function handlePaginationChange(e) {
		console.log(e);
		// setPage(e.target.value);
		router.push(`paginationSSR/?page=${page}`, undefined, {
			shallow: true
		});
	}

	useEffect(() => {
		router.query.page &&
			router.push(`/paginationSSR?page=${router.query.page}`, undefined, {
				shallow: true
			});
	}, []);

	return (
		<div>
			<h1>Pagination SSG</h1>
			<>
				<button
					disabled={page === 1}
					onClick={() => {
						setPage(page - 1);
						router.push(`paginationSSR/?page=${page - 1}`, undefined, {
							shallow: true
						});
					}}
				>
					Previous
				</button>
			</>
			<>
				<button
					disabled={!data?.info?.next || isPreviousData}
					onClick={() => {
						setPage(page + 1);
						router.push(`/paginationSSR?page=${page + 1}`, undefined, {
							shallow: true
						});
					}}
				>
					Next
				</button>
			</>

			<div className="grid-container">
				{data?.results?.map((character) => (
					<article key={character.id}>
						<Image
							src={character.image}
							alt={character.name}
							height={250}
							// loading="lazy"
							width={300}
							priority
						/>

						<div className="text">
							<p>Name: {character.name}</p>
							<p>Lives in: {character.location.name}</p>
							<p>Species: {character.species}</p>
							<i>Id: {character.id} </i>
							<p>Status: {character.status}</p>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}

export default PaginationSSR;

export const getServerSideProps = async (context) => {
	let page = 1;
	if (context.query.page) {
		page = parseInt(context.query.page);
	}

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['characters', page], fetchCharacters);

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};
