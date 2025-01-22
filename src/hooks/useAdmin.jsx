import { useQuery } from "@tanstack/react-query"
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPrivate from "./useAxiosPrivate";


const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosPrivate.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;