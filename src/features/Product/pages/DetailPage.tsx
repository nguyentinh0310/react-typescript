import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import useProductDetail from 'hooks/useFetch';
import React from 'react';
import { useParams,Switch,Route,useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductInfo from '../components/ProducInfo';
import ProductDescription from '../components/ProductDescription';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReview';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },

  left: {
    width: '350px',
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading:{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%'
  }
}));

export default function DetailPage() {
  const classes = useStyles();
  const { productId } = useParams<{ productId: string }>();
  const { url } = useRouteMatch();

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return <LinearProgress className={classes.loading}/>
  }

  const handleAddToCartForm = (formValues: any) =>{
    console.log("form subnit", formValues)
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <img src={product?.images[0]} alt={product?.name} width="100%" />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartForm} />
            </Grid>
          </Grid>
        </Paper>
          <ProductMenu/>

          <Switch>
            <Route path={url} exact>
              <ProductDescription product={product}/>
            </Route>
            <Route path={`${url}/reviews`} component={ProductReviews}/>
          </Switch>
      </Container>
    </Box>
  );
}
