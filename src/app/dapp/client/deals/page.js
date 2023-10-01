"use client";
import DealsView from "@/components/DealsView";
import { Container, Divider } from "@mui/material";
import React from "react";

export default function Deals() {
  return (
    <Container sx={{ paddingTop: 2 }}>
      <DealsView />
    </Container>
  );
}
