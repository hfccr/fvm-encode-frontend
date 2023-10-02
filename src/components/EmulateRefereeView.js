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
import { EmulateReferee } from "./EmulateReferee";
import { useIsReferee } from "@/hooks/useAppeals";

export default function EmulateRefereeView({ }) {
    const [hydrated, setHydrated] = useState(false);
    const { address } = useAccount();
    const {
        isReferee,
        isLoading: isRefereeLoading,
        isSuccess: isRefereeSuccess,
        isError: isRefereeError,
    } = useIsReferee(address);
    useEffect(() => {
        setHydrated(true);
    }, []);
    return (
        <Box
            element="div"
        >
            <Stack direction="column" justifyContent="space-between" alignItems="center">
                {isRefereeLoading && (
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                )}
                {isRefereeError && (
                    <Alert severity="error">Failed to fetch miner info</Alert>
                )}
                {isRefereeSuccess && isReferee === true && (
                    <Typography sx={{ marginBottom: 4 }}>Your address is a referee</Typography>
                )}
            </Stack>
            {isRefereeSuccess && isReferee === false && (
                <EmulateReferee />
            )}
        </Box>
    );
}
