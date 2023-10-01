"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { client, chains } from "../util/chain";
import { brandingDarkTheme } from "./../util/theme";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from '@mui/material';
import "@rainbow-me/rainbowkit/styles.css";
import Header from "./../components/Header";
import '@fontsource/krona-one';

const inter = Inter({ subsets: ['latin'] })

const customRainbowKitProperties = {
  fonts: {
    body: '"Krona One"',
  },
};
const rainbowKitTheme = { ...darkTheme(), ...customRainbowKitProperties };

BigInt.prototype.toJSON = function () { return this.toString() }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box sx={{ minHeight: '100vh' }}>
          <WagmiConfig config={client}>
            <ThemeProvider theme={brandingDarkTheme}>
              <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
                <Header />
                <div>{children}</div>
                <Toaster
                  toastOptions={{
                    className: "",
                    style: {
                      fontFamily: "Krona One",
                    },
                  }}
                />
              </RainbowKitProvider>
            </ThemeProvider>
          </WagmiConfig>
        </Box>
      </body>
    </html>
  )
}
