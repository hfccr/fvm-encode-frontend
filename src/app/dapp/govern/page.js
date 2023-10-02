"use client";
import React from "react";
import { Tab, Box, Divider, Stack, Tabs, Typography, Alert } from "@mui/material";
import Link from "next/link";

export default function ClientLayout({ children }) {

  return (
    <>
      <Box
        component="div"
        sx={{
          marginBottom: 2,
          fontFamily: "Krona One",
          fontSize: "x-large",
          cursor: "pointer",
          background: 'linear-gradient(135deg,#70f,#40f)',
          padding: 4,
          borderRadius: 1,
        }}
      >
        Govern
      </Box>
      <Stack direction="row" sx={{ padding: 2, marginTop: 4 }} spacing={4} justifyContent="center" alignItems="center">
        <Alert severity="info">Only Admin Users Can Govern The Protocol</Alert>
      </Stack>
    </>
  );
}
