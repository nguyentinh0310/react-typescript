import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { productApi } from 'api/productApi';
import { Product } from 'models';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '20px',
    paddingBottom: '20px',
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const history = useHistory();

  const [productList, setProductList] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 12,
  });
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 12,
    _totalRows: 12,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProductList(data);
        setPagination(pagination);
        console.log(data);
      } catch (error) {
        console.log('Failed to fetch product list: ', productList);
      }
      setLoading(false);
    })();
  }, [filters]);


  const handlePageChange = (e: any, page: number) =>{
    setFilters(prevFilter =>({
      ...prevFilter,
      _page: page
    }))
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  color="secondary"
                  count={Math.ceil(pagination._totalRows / pagination._limit)}
                  page={pagination._page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
