"use client";
import { useState, useEffect } from "react";
import {
    Skeleton,
    Typography,
    Box,
    Stack,
    Grid,
    Button
} from "@mui/material";
import {
    useAccount,
    useBalance,
} from "wagmi";
import { useVaultBalance } from "@/hooks/useVault";
import { AddToVault } from "./AddToVault";
import { formatEther } from "viem";
import { GetFromVault } from "./GetFromVault";

export default function Balance({ }) {
    const [hydrated, setHydrated] = useState(false);
    const { address } = useAccount();
    const { data, isLoading, isSuccess } = useBalance({
        address,
    });
    const {
        vaultBalance,
        isLoading: vaultBalanceLoading,
        isSuccess: vaultBalanceSuccess,
    } = useVaultBalance(address);
    useEffect(() => {
        setHydrated(true);
    }, []);
    return (
        <Box
            element="div"
        >
            <Grid container flexGrow={1} spacing={10}>
                <Grid item xs={6}>
                    <Stack direction="column-reverse" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">FIL Balance</Typography>
                        {isLoading && <Skeleton variant="text" sx={{ fontSize: "1rem" }} />}
                        {isSuccess && (
                            <Typography variant="h4">{`${(+data.formatted).toFixed(4)} ${data.symbol
                                }`}</Typography>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack direction="column-reverse" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">Retrieval Vault Balance</Typography>
                        {vaultBalanceLoading && (
                            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                        {vaultBalanceSuccess && (
                            <Typography variant="h4">{`${((+formatEther(vaultBalance)).toFixed(4))} ${data.symbol}`}</Typography>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack direction="column-reverse" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">Add To Vault</Typography>
                        {vaultBalanceLoading && (
                            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                        {vaultBalanceSuccess && (
                            <AddToVault />
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack direction="column-reverse" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">Withdraw From Vault</Typography>
                        {vaultBalanceLoading && (
                            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                        {vaultBalanceSuccess && (
                            <GetFromVault />
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
