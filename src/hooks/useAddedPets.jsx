import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './useAxiosPrivate';

const useAddedPets = ({ search = '', category = '', adopted }) => {
  const axiosPrivate = useAxiosPrivate();

  // Fetch added pets using React Query
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['addedPets', search, category, adopted], // Unique key for caching the query with filters
    queryFn: async () => {
      const params = {};

      // Add filters to the query parameters if present
      if (search) params.search = search;
      if (category) params.category = category;
      if (adopted !== undefined) params.adopted = adopted;

      // Send GET request with query params to the backend
      const response = await axiosPrivate.get('/pets/search', { params });
      console.log(response.data)
      return response.data; // Assume the backend returns the pets array
    },
    enabled: true, // Enables the query immediately
  });

  // Return an object with query state and functions
  return { pets: data, isLoading, isError, error, refetch };
};

export default useAddedPets;