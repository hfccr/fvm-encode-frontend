import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { Box, Button, TextField } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce'
import Providers from '@/constants/Providers.json';
import { parseEther } from 'viem';

export function EmulateMiner() {
    const [minerId, setMinerId] = React.useState(17387);
    const debouncedMinerId = useDebounce(minerId);
    const endpoint = 'https://fvm.filecoin.io/';
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: Providers.address,
        abi: Providers.abi,
        functionName: 'emulateProviderActor',
        args: [endpoint, debouncedMinerId],
        enabled: Boolean(minerId)
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
                <TextField
                    id="value"
                    label="Miner ID"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={minerId}
                    onChange={(e) => setMinerId(e.target.value)}
                />
                <Box sx={{ textAlign: 'center', margin: 1 }}>
                    <Button type="submit" color="secondary" variant="outlined" disabled={!write || isLoading}>
                        {isLoading ? 'Emulating...' : 'Emulate'}
                    </Button>
                </Box>
                {isSuccess && (
                    <div>
                        Successfully Emulated Miner Actor!
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
