import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://petadoption-server-roan.vercel.app/'
})

const useAxiosPublic =()=>{
    return axiosPublic
}
export default useAxiosPublic