import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { Box, Button, TextField, Stack, Alert } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce'
import Deals from '@/constants/Deals.json';
import { parseEther } from 'viem';

export function NewDeal() {
    const [dealId, setDealId] = React.useState(138178);
    const [providerCollateral, setProviderCollateral] = React.useState(2);
    const [value, setValue] = React.useState(1);
    const [appealAddresses, setAppealAddress] = React.useState('0x93d53c4E12028D69cfeA0F4d5c213655d091b964');
    // const appealAddresses = ['0x93d53c4E12028D69cfeA0F4d5c213655d091b964'];
    const debouncedDealId = useDebounce(dealId)
    const debouncedProviderCollateral = useDebounce(providerCollateral);
    const debouncedValue = useDebounce(value);
    const debouncedAppealAddresses = useDebounce(appealAddresses);

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: Deals.address,
        abi: Deals.abi,
        functionName: 'createRetrievalProposalForExistingDeal',
        args: [debouncedDealId, debouncedProviderCollateral, debouncedValue, [debouncedAppealAddresses]],
        enabled: Boolean(debouncedDealId && debouncedProviderCollateral && debouncedValue && debouncedAppealAddresses)
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
            <Stack spacing={3} justifyContent="center" direction="row" sx={{ margin: 0 }}>
                <TextField
                    id="dealId"
                    label="Filecoin Deal ID"
                    type="number"
                    required={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={dealId}
                    onChange={(e) => setDealId(e.target.value)}
                />
                <TextField
                    id="collateral"
                    label="Provider Collateral In FIL"
                    type="number"
                    required={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={providerCollateral}
                    onChange={(e) => setProviderCollateral(e.target.value)}
                />
            </Stack>
            <Stack spacing={3} justifyContent="center" direction="row" sx={{ margin: 6 }}>
                <TextField
                    id="value"
                    label="Deal Value In FIL"
                    type="number"
                    required={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <TextField
                    id="appealAddress"
                    label="Appeal Address"
                    type="text"
                    required={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={appealAddresses}
                    onChange={(e) => setAppealAddress(e.target.value)}
                />

            </Stack>
            <Box sx={{ textAlign: 'center', margin: 3 }}>
                <Button type="submit" color="secondary" variant="outlined" disabled={!write || isLoading}>
                    {isLoading ? 'Creating Deal Proposal...' : 'Create Deal Proposal'}
                </Button>
            </Box>
            {isSuccess && (
                <div>
                    <Alert>
                        Successfully Created A New Retrieval Deal Proposal!
                    </Alert>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button href={`https://fvm.starboard.ventures/calibration/explorer/tx/${data?.hash}`}>View On Starboard</Button>
                    </Box>
                </div>
            )}
            {(isPrepareError || isError) && (
                <div>
                    <div>Prepare Error</div>
                    <div>Deposit Value In Vault To Create A Deal</div>
                    <div>Normal Error</div>
                    <div>{error?.message}</div>
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
