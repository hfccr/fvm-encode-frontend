"use client";
import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";
import { Box, Stack, Typography } from '@mui/material'
import SportsIcon from '@mui/icons-material/Sports';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Stack justifyContent="center" alignItems="center" spacing={4}>
          <Typography variant="h4" sx={{ margin: 6 }}>FVM Native Retrieval Protocol Modelled On CryptoNetLab Retriev</Typography>
        </Stack>
      </div>
      <Stack spacing={10} direction="row" justifyContent="center" alignItems="center" sx={{ width: '100%', marginLeft: 'auto', margnRight: 'auto' }}>
        <Box>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="FVM Retrieval Logo"
            width={440}
            height={440}
            priority
          />
        </Box>
        <Box>
          <div className={styles.grid}>
            <Box className={styles.card} sx={{ background: 'linear-gradient(135deg,#f08,#d0e)', margin: 2 }}>
              <Link href="/dapp/client/about">
                <Box sx={{ width: 100, height: 100 }}>
                  <PersonIcon sx={{ fontSize: 80 }} />
                </Box>
                <h2>
                  Client
                </h2>
                <p>Incentivize Retrieval For Filecoin Deals</p>
              </Link>
            </Box>

            <Box className={styles.card} sx={{ background: 'linear-gradient(135deg,#d0e,#91f)', margin: 2 }}>
              <Link href="/dapp/provider/about">
                <Box sx={{ width: 100, height: 100 }}>
                  <SaveIcon sx={{ fontSize: 80 }} />
                </Box>
                <h2>
                  Provider
                </h2>
                <p>Earn More By Providing Retrieval Services</p>
              </Link>
            </Box>


          </div>
          <div className={styles.grid}>
            <Box className={styles.card} sx={{ background: 'linear-gradient(135deg,#91f,#70f)', margin: 2 }}>
              <Link href="/dapp/referee/about">
                <Box sx={{ width: 100, height: 100 }}>
                  <SportsIcon sx={{ fontSize: 80 }} />
                </Box>
                <h2>
                  Referee
                </h2>
                <p>
                  Maintain the protocol by evaluating client appeals
                </p>
              </Link>
            </Box>
            <Box className={styles.card} sx={{ background: 'linear-gradient(135deg,#70f,#40f)', margin: 2 }}>
              <Link href="/dapp/govern">
                <Box sx={{ width: 100, height: 100 }}>
                  <SettingsIcon sx={{ fontSize: 80 }} />
                </Box>
                <h2>
                  Govern
                </h2>
                <p>Manage Protocol Settings</p>
              </Link>
            </Box>
          </div>
        </Box>
      </Stack>
    </main>
  )
}
