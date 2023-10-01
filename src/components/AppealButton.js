import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce'
import Appeals from '@/constants/Appeals.json';
import { parseEther } from 'viem';

export function AppealButton({ id }) {
    const [open, setOpen] = React.useState(true);

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: Appeals.address,
        abi: Appeals.abi,
        functionName: 'createAppeal',
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
                {isLoading ? 'Appealing...' : 'Appeal'}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Create Appeal"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to create an appeal for this deal? The appeal fee will be deducted from your vault balance.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { write?.(); handleClose() }}>
                        Create Appeal
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
