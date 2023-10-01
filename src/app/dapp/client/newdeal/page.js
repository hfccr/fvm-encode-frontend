"use client";
import { NewDeal } from "@/components/NewDeal";
import { Container, Divider } from "@mui/material";
import React from "react";

export default function Deals() {
  return (
    <Container sx={{ paddingTop: 2 }}>
      <NewDeal />
    </Container>
  );
}
