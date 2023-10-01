import { useContractRead } from "wagmi";
import Providers from '@/constants/Providers.json';

export function useMinerId(address) {
    const {
        data: minerId,
        isError,
        isLoading,
        error,
        isSuccess,
    } = useContractRead({
        address: Providers.address,
        abi: Providers.abi,
        functionName: "getActorId",
        args: [address],
        watch: true,
    });
    return { isSuccess, minerId, isLoading, isError, error };
}