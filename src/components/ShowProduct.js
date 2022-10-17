import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, Stack } from '@mui/material';
import { getProducts, productSelectors, deleteProduct } from '../features/productSlice';
import { Link } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';

const ShowProduct = () => {
    const [singleProduct, setSingleProduct] = useState("");
    const dispatch = useDispatch();

    const products = useSelector(productSelectors.selectAll);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);


    const [open, setOpen] = useState(false);

    const handleClickOpen = (id) => {
        setOpen(true);
        setSingleProduct(id);
    };

    const handleClose = () => {
        setOpen(false)
        setSingleProduct("");
    };

    const handleDelete = () => {
        dispatch(deleteProduct(singleProduct));
        handleClose();
    }

    return (
        <Container maxWidth="md">

            <DeleteProduct open={open} handleClose={handleClose} handleDelete={handleDelete} />

            <Link to="add" style={{ textDecoration: 'none', float: "right" }}>
                <Button variant="contained">
                    Add New
                </Button>
            </Link>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">No.</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, i) => (
                        <TableRow
                            key={product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" sx={{ width: 75 }}>
                                {i + 1}
                            </TableCell>
                            <TableCell align="center">
                                {product.title}
                            </TableCell>
                            <TableCell align="center">
                                {product.price}
                            </TableCell>
                            <TableCell align="center">
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Link to={`edit/${product.id}`} style={{ textDecoration: 'none', float: "right" }}>
                                        <Button variant="contained" color="warning">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button variant="contained" color="error" onClick={() => handleClickOpen(product.id)}>
                                        Delete
                                    </Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}

export default ShowProduct