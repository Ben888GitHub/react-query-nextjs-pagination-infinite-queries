import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Fragment } from 'react';

function InfiniteQueriesSSR() {
	const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteScroll();

	// console.log(data);

	return (
		<div>
			<h1>
				Rick and Morty with React Query and Infinite Scroll - Client Side
				Rendered
			</h1>
			{data && (
				<InfiniteScroll
					dataLength={data?.pages.length * 20}
					next={fetchNextPage}
					hasMore={hasNextPage}
					loader={<h4>Loading...</h4>}
				>
					<div className="grid-container">
						{data?.pages.map((page, idx) => (
							<Fragment key={idx}>
								{page.results.map((character) => (
									<article key={character.id}>
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
											<p>Status: {character.status}</p>
										</div>
									</article>
								))}
							</Fragment>
						))}
					</div>
				</InfiniteScroll>
			)}
		</div>
	);
}

export default InfiniteQueriesSSR;
