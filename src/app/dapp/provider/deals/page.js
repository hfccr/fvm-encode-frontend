"use client";
import ProviderDealsView from "@/components/ProviderDealsView";
import { Container, Divider } from "@mui/material";
import React from "react";

export default function Deals() {
  return (
    <Container sx={{ paddingTop: 2 }}>
      <ProviderDealsView />
    </Container>
  );
}
