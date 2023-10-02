"use client";
import { EmulateMiner } from "@/components/EmulateMiner";
import { EmulateReferee } from "@/components/EmulateReferee";
import EmulateRefereeView from "@/components/EmulateRefereeView";
import EmulateView from "@/components/EmulateView";
import { Container, Typography } from "@mui/material";
import React from "react";

export default function About() {
  return (
    <Container>
      <EmulateRefereeView />
    </Container>
  );
}