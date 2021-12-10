import { AppBar, Badge, Box, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { useAppSelector } from 'app/hooks';
import { cartItemsCountSelector } from 'features/Cart/cartSlice';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    color: 'white',
    TextDecoration: 'none ',
  },
  cart: {
    color: 'white',
  },
}));

export default function Header() {
  const classes = useStyles();
  const cartItemsCount = useAppSelector(cartItemsCountSelector);
  const history = useHistory();

  const handleCartClick = () => {
    history.push('/cart');
  };
  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
          <Typography variant="h6" component="div" className={classes.title}>
            <Link to="/" className={classes.titleLink}>DZ</Link>
          </Typography>

          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
