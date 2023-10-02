import { useContractRead } from "wagmi";
import Appeals from '@/constants/Appeals.json';

export function useIsReferee(address) {
    const {
        data: isReferee,
        isError,
        isLoading,
        error,
        isSuccess,
    } = useContractRead({
        address: Appeals.address,
        abi: Appeals.abi,
        functionName: "isReferee",
        args: [address],
        watch: true,
    });
    return { isSuccess, isReferee, isLoading, isError, error };
}
