import React from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { useQuery } from '@tanstack/react-query';

const useDonation = () => {
    const axiosPublic = useAxiosPrivate();
    const { refetch, data: donations = [] } = useQuery({
        queryKey: ['donations'],
        queryFn: async() => {
            const res = await axiosPublic.get('/donations');
            return res.data;
        }
    })

    return [donations, refetch]
};
export default useDonation;