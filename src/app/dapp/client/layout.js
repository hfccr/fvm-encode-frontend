"use client";
import React from "react";
import { Tab, Box, Divider, Stack, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const path = usePathname();
  let selected = "about";
  if (path.indexOf("deals") >= 0) {
    selected = "deals";
  } else if (path.indexOf('newdeal') >= 0) {
    selected = "newdeal";
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
          background: 'linear-gradient(135deg,#f08,#d0e)',
          padding: 4,
          borderRadius: 1,
        }}
      >
        Client
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
            href="/dapp/client/about"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
          <Tab
            label="New Deal"
            value="newdeal"
            href="/dapp/client/newdeal"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
          <Tab
            label="Retrieve Deals"
            value="deals"
            href="/dapp/client/deals"
            LinkComponent={Link}
            sx={{ alignItems: "flex-start", fontSize: "large" }}
          />
        </Tabs>
        <>{children}</>
      </Stack>
    </>
  );
}
