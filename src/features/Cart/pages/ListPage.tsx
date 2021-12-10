import { Box, Card, Container, Grid, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { cartTotalSelector, removeFromCart, selectCartItem } from '../cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const history = useHistory();
  const { cartItems } = useAppSelector((state) => state.cart);
  const total = useAppSelector(cartTotalSelector);
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = (id: any) => {
    dispatch(removeFromCart(id));
  };
  return (
    <Box className={classes.root}>
      <Container>
        {cartItems.length === 0 ? (
          <Box>Empty</Box>
        ) : (
          <Card variant="outlined">
            {cartItems.map((item) => (
              <Grid container spacing={2} key={item.id}>
                <Grid item md={3}>
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.name}
                    width="100%"
                    height="150px"
                  />
                </Grid>
                <Grid item md={3}>
                  <Box>{item.product?.name}</Box>
                </Grid>
                <Grid item md={3}>
                  <Box>
                    {item.quantity}
                    <Delete color="error" onClick={() => handleRemoveCartItem(item.id)} />
                  </Box>
                </Grid>
                <Grid item md={3}>
                  <Box>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(total)}
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Card>
        )}
      </Container>
    </Box>
  );
}
