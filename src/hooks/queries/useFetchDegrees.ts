import { useQuery } from '@tanstack/react-query';
import { Degree } from '@/lib/types';

const fetchDegrees = async (query: string | null): Promise<Degree[]> => {
    const url = new URL('/api/degrees', window.location.href);
    if (query) {
        url.searchParams.append('query', query);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error('Failed to fetch degrees');
    }

    const data = await response.json();
    return data as Degree[];
};

export const useFetchDegrees = (query: string | null) => {
    return useQuery<Degree[], Error>({
        queryKey: ['degrees', query],
        queryFn: () => fetchDegrees(query),
        enabled: query !== null, // Only run the query when a query is provided
    });
};
