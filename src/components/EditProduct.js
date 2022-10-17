import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts, productSelectors, updateProduct } from '../features/productSlice';

const EditProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const product = useSelector((state) => productSelectors.selectById(state, id));

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
        }
    }, [product]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await dispatch(updateProduct({ id, title, price }));
        navigate('/');
    }

    return (
        <form onSubmit={handleUpdate}>
            <Paper elevation={3} sx={{ paddingX: 5, paddingY: 2 }}>
                <Typography variant="h4">Edit Product</Typography>
                <Stack direction="row" justifyContent="center" spacing={2} sx={{ paddingBottom: 2 }}>
                    <TextField label="Title" variant='outlined' fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField label="Price" variant='outlined' type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} />
                </Stack>
                <Button variant="contained" color='success' fullWidth type='submit' >
                    Update
                </Button>
            </Paper>
        </form>
    )
}

export default EditProduct;