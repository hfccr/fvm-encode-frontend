"use client";
import { useState, useEffect } from "react";
import {
    Skeleton,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import {
    useAccount,
    useBalance,
} from "wagmi";
import { useTokenBalance } from "@/hooks/useGovernanceToken";

export default function Balance({ }) {
    const [hydrated, setHydrated] = useState(false);
    const { address } = useAccount();
    const { data, isLoading, isSuccess } = useBalance({
        address,
    });
    const {
        tokenBalance,
        isLoading: tokenBalanceLoading,
        isSuccess: tokenBalanceSuccess,
    } = useTokenBalance(address);
    useEffect(() => {
        setHydrated(true);
    }, []);
    return (
        <Box
            element="div"
            sx={{ border: "1px solid gray", borderRadius: 4, padding: 3 }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">FIL Balance</Typography>
                {isLoading && <Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
                {isSuccess && (
                    <Typography variant="subtitle1">{`${(+data.formatted).toFixed(4)} ${data.symbol
                        }`}</Typography>
                )}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Governance Tokens</Typography>
                {tokenBalanceLoading && (
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                )}
                {tokenBalanceSuccess && (
                    <Typography variant="subtitle1">{`${(+tokenBalance.toString()).toFixed(
                        4
                    )} NGT`}</Typography>
                )}
            </Stack>
        </Box>
    );
}
