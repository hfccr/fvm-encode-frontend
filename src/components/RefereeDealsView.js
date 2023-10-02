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
import { useAllProviderDealsIds, useMinerId } from "@/hooks/useProvider";
import ProviderDealsTable from "./ProviderDealsTable";

export default function RefereeDealsView({ }) {
  const [hydrated, setHydrated] = useState(false);
  const { address } = useAccount();
  const {
    allRetrievalDeals: deals,
    isLoading: dealsLoading,
    isSuccess: dealsSuccess,
    isError: dealsError,
  } = useAllDeals();
  const {
    minerId,
    isLoading: minerLoading,
    isSuccess: minerSuccess,
    isError: minerError,
  } = useMinerId(address);
  useEffect(() => {
    setHydrated(true);
  }, []);
  let myDeals = [];
  if (dealsSuccess && minerSuccess) {
    myDeals = deals.map((deal) => ({ ...deal })).filter((deal) => deal.appeal_addresses.toLowerCase().indexOf(address.toLowerCase()) >= 0);
  }
  return (
    <Box
      element="div"
    >
      <Stack direction="column" justifyContent="space-between" alignItems="center">
        {dealsLoading || minerLoading && (
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        )}
        {dealsError || minerError && (
          <Alert>Failed to fetch deals</Alert>
        )}
        {dealsSuccess && minerSuccess && (
          <ProviderDealsTable deals={myDeals} />
        )}
      </Stack>
    </Box>
  );
}
