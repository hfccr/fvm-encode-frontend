import { useContractRead } from "wagmi";
import Vault from '@/constants/Vault.json';

export function useVaultBalance(address) {
    const {
        data: vaultBalance,
        isError,
        isLoading,
        error,
        isSuccess,
    } = useContractRead({
        address: Vault.address,
        abi: Vault.abi,
        functionName: "getBalance",
        args: [address],
        watch: true,
    });
    return { isSuccess, vaultBalance, isLoading, isError, error };
}