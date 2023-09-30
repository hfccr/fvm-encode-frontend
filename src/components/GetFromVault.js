import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { Box, Button, TextField } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce'
import Vault from '@/constants/Vault.json';
import { parseEther } from 'viem';

export function GetFromVault() {
    const [value, setValue] = React.useState(1);
    const debouncedValue = useDebounce(value)

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: Vault.address,
        abi: Vault.abi,
        functionName: 'withdrawFromVault',
        args: [parseEther('' + debouncedValue)],
        enabled: Boolean(debouncedValue),
    })
    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                write?.()
            }}
        >
            <TextField
                id="value"
                label="Withdraw Amount"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Box sx={{ textAlign: 'center', margin: 1 }}>
                <Button type="submit" color="secondary" variant="outlined" disabled={!write || isLoading}>
                    {isLoading ? 'Withdrawing...' : 'Withdraw'}
                </Button>
            </Box>
            {isSuccess && (
                <div>
                    Successfully Deposited Into Vault!
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
    )
}
