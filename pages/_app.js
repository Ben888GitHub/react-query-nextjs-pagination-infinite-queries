import '../styles/globals.css';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { useRef, useState } from 'react';

function MyApp({ Component, pageProps }) {
	// Instantiate new Client
	// const queryClient = useRef(new QueryClient());
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
