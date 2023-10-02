import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { Box, Button, TextField } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce'
import Appeals from '@/constants/Appeals.json';
import { parseEther } from 'viem';

export function EmulateReferee() {
    const endpoint = 'https://fvm.filecoin.io/';
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: Appeals.address,
        abi: Appeals.abi,
        functionName: 'emulateReferee',
        args: [endpoint],
        enabled: true
    })
    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <Box sx={{ textAlign: 'center' }}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    write?.()
                }}
            >
                <Box sx={{ textAlign: 'center', margin: 1 }}>
                    <Button type="submit" color="secondary" variant="outlined" disabled={!write || isLoading}>
                        {isLoading ? 'Emulating...' : 'Emulate'}
                    </Button>
                </Box>
                {isSuccess && (
                    <div>
                        Successfully Emulated Referee!
                        <Box sx={{ textAlign: 'center' }}>
                            <Button href={`https://fvm.starboard.ventures/calibration/explorer/tx/${data?.hash}`}>View On Starboard</Button>
                        </Box>
                    </div>
                )}
                {(isPrepareError || isError) && (
                    <div>
                        <div>Prepare Error</div>
                        <div>{prepareError?.message}</div>
                        <div>Normal Error</div>
                        <div>{error?.message}</div>
                    </div>
                )}
            </form>
        </Box>
    )
}
