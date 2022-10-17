import React, { useState } from 'react'
import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { saveProduct } from '../features/productSlice';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createProduct = async (e) => {
        e.preventDefault();
        await dispatch(saveProduct({ title, price }));
        navigate('/');
    }

    return (
        <form onSubmit={createProduct}>
            <Paper elevation={3} sx={{ paddingX: 5, paddingY: 2 }}>
                <Typography variant="h4">Add Product</Typography>
                <Stack direction="row" justifyContent="center" spacing={2} sx={{ paddingBottom: 2 }}>
                    <TextField label="Title" variant='outlined' fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField label="Price" variant='outlined' type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} />
                </Stack>
                <Button variant="contained" color='success' fullWidth type='submit' >
                    Save
                </Button>
            </Paper>
        </form>
    )
}

export default AddProduct