
"use client";
import RefereeDealsView from "@/components/RefereeDealsView";
import { Container, Divider } from "@mui/material";
import React from "react";

export default function Deals() {
  return (
    <Container sx={{ paddingTop: 2 }}>
      <RefereeDealsView />
    </Container>
  );
}
