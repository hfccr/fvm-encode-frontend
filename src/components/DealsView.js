"use client";
import { useState, useEffect } from "react";
import {
    Skeleton,
    Typography,
    Box,
    Stack,
    Grid,
    Alert,
} from "@mui/material";
import {
    useAccount,
} from "wagmi";
import { useAllDeals } from "@/hooks/useDeals";
import { formatEther } from "viem";
import DealsTable from "./DealsTable";

export default function DealsView({ }) {
    const [hydrated, setHydrated] = useState(false);
    const {
        allRetrievalDeals: deals,
        isLoading: dealsLoading,
        isSuccess: dealsSuccess,
        isError: dealsError,
    } = useAllDeals();
    useEffect(() => {
        setHydrated(true);
    }, []);
    const { address } = useAccount();
    let myDeals = [];
    if (dealsSuccess) {
        myDeals = deals.map((deal, index) => ({ ...deal, id: index })).filter((deal) => deal.owner === address);
    }
    console.log('MYDEALS');
    console.log(myDeals);
    return (
        <Box
            element="div"
        >
            <Stack direction="column" justifyContent="space-between" alignItems="center">
                {dealsLoading && (
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                )}
                {dealsError && (
                    <Alert>Failed to fetch deals</Alert>
                )}
                {dealsSuccess && (
                    <DealsTable deals={myDeals} />
                )}
            </Stack>
        </Box>
    );
}
