"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Connect from "./Connect";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { Container, Divider } from "@mui/material";

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === "/" || pathname === undefined;
    return (
        <Box sx={{
            flexGrow: 1, padding: 6,
            //  background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(1,1,29,1) 50%, rgba(21,21,69,0) 100%)" 
        }}
        >
            <Container maxWidth="xl">
                <AppBar position="static" sx={{ background: "transparent", boxShadow: 'none' }}>
                    <Toolbar>
                        <Box sx={{ flexGrow: 0, paddingRight: 3 }}>
                            <Link href="/" sx={{}}>
                                <Image
                                    src="/logo.png"
                                    alt="Retrieve Logo"
                                    width={80}
                                    height={80}
                                    priority
                                />
                            </Link>
                        </Box>
                        <Box component="div" sx={{ flexGrow: 0 }}>
                            <Link href="/" sx={{}}>
                                <Typography
                                    variant="h4"
                                    component="div"
                                    sx={{
                                        flexGrow: 1,
                                        fontFamily: "Krona One",
                                        cursor: "pointer",
                                        marginRight: 2,
                                    }}
                                >
                                    FVM Retrieve
                                </Typography>
                            </Link>
                        </Box>

                        <Stack direction="row" justifyContent='center' alignItems="center" sx={{ marginLeft: 'auto' }}>
                            <Connect />
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Divider sx={{ marginTop: 4, filter: 'filter: invert(0) drop-shadow(0 0 0.3rem #ffffff70)' }} />
            </Container>
        </Box>
    );
}
