import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce'
import Providers from '@/constants/Providers.json';
import { parseEther } from 'viem';

export function ConfirmButton({ id }) {
    const [open, setOpen] = React.useState(false);

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: Providers.address,
        abi: Providers.abi,
        functionName: 'acceptRetrievalDealProposal',
        args: [id],
        enabled: true,
    })
    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Button type="submit" color="secondary" variant="outlined" disabled={!write || isLoading} onClick={handleOpen}>
                {isLoading ? 'Confirming...' : 'Confirm'}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Proposal"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to confirm this deal?
                        You will have to provide retrieval for the Piece CID associated with the data for the duration of the deal.
                        The collateral will be deducted from your vault balance.
                        You will be slashed if you fail to provide retrieval service for the data.
                        You can claim the value of the contract and the collateral after you have successfully provided retrieval services.
                        <div>{prepareError?.message}</div>
                        <div>Normal Error</div>
                        <div>{error?.message}</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { write?.(); handleClose() }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        // {isSuccess && (
        //     <div>
        //         Successfully Deposited Into Vault!
        //         <Box sx={{ textAlign: 'center' }}>
        //             <Button href={`https://fvm.starboard.ventures/calibration/explorer/tx/${data?.hash}`}>View On Starboard</Button>
        //         </Box>
        //     </div>
        // )}
        // {(isPrepareError || isError) && (
        //     <div>
        //         <div>Prepare Error</div>
        //         <div>{prepareError?.message}</div>
        //         <div>Normal Error</div>
        //         <div>{error?.message}</div>
        //     </div>
        // )}
    )
}
