"use client";
import React from "react";
import { Tab, Box, Divider, Stack, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RefereeLayout({ children }) {
  const path = usePathname();
  let selected = "about";
  if (path.indexOf("deals") >= 0) {
    selected = "deals";
  } else if (path.indexOf("emulate") >= 0) {
    selected = "emulate";
  }
  return (
    <>
      <Box
        component="div"
        sx={{
          marginBottom: 2,
          fontFamily: "Krona One",
          fontSize: "x-large",
          cursor: "pointer",
          background: 'linear-gradient(135deg,#91f,#70f)',
          padding: 4,
          borderRadius: 1,
        }}
      >
        Referee
      </Box>
      <Stack direction="row" sx={{ padding: 2, marginTop: 4 }} spacing={4}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          orientation="vertical"
          variant="standard"
          aria-label="client menu vertical"
          value={selected}
          sx={{
            borderRight: 1,
            borderColor: "divider",
            flexShrink: 0,
            width: "220px",
            alignContent: "flex-start",
          }}
        >
          <Tab
            color="secondary"
            label="Retrieve Vault"
            value="about"
            href="/dapp/referee/about"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
          <Tab
            color="secondary"
            label="Emulate"
            value="emulate"
            href="/dapp/referee/emulate"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
          <Tab
            label="Retrieve Deals"
            value="deals"
            href="/dapp/referee/deals"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
        </Tabs>
        <>{children}</>
      </Stack>
    </>
  );
}
