import { useContractRead } from "wagmi";
import Deals from '@/constants/Deals.json';

export function useAllDeals() {
    const {
        data: allRetrievalDeals,
        isError,
        isLoading,
        error,
        isSuccess,
    } = useContractRead({
        address: Deals.address,
        abi: Deals.abi,
        functionName: "getAllDeals",
        args: [],
        watch: true,
    });
    return { isSuccess, allRetrievalDeals, isLoading, isError, error };
}