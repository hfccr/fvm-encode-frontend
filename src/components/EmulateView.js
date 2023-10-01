"use client";
import { useState, useEffect } from "react";
import {
    Skeleton,
    Typography,
    Box,
    Stack,
    Alert,
} from "@mui/material";
import {
    useAccount,
} from "wagmi";
import { useMinerId } from "@/hooks/useProvider";
import { EmulateMiner } from "./EmulateMiner";

export default function EmulateView({ }) {
    const [hydrated, setHydrated] = useState(false);
    const { address } = useAccount();
    const {
        minerId,
        isLoading: minerLoading,
        isSuccess: minerSuccess,
        isError: minerError,
    } = useMinerId(address);
    useEffect(() => {
        setHydrated(true);
    }, []);
    return (
        <Box
            element="div"
        >
            <Stack direction="column" justifyContent="space-between" alignItems="center">
                {minerLoading && (
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                )}
                {minerError && (
                    <Alert severity="error">Failed to fetch miner info</Alert>
                )}
                {minerSuccess && minerId.toString() !== '0' && (
                    <Typography sx={{ marginBottom: 4 }}>Your address is associated with miner id {minerId.toString()}</Typography>
                )}
            </Stack>
            {minerSuccess && minerId.toString() === '0' && (
                <EmulateMiner />
            )}
        </Box>
    );
}
