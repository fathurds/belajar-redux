import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const DeleteProduct = ({ open, handleClose, handleDelete }) => {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog fullScreen={fullscreen} open={open} onClose={handleClose} >
            <DialogTitle id="responsive-dialog-title">
                {"Are you sure?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You won't be able to revert this!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleDelete} autoFocus variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteProduct