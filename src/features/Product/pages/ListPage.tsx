import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { productApi } from 'api/productApi';
import { ListParams, Product } from 'models';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FilterByViewer from '../components/Filter/FilterByViewer';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

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
    _sort: 'salePrice',
    _order: 'desc',
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
      } catch (error) {
        console.log('Failed to fetch product list: ', productList);
      }
      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e: any, page: number) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    console.log(newFilter);
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: 1,
      ...newFilter,
    }));
  };

  const handleSortChange = (newFilter: ListParams) => {
    const [_sort, _order] = newFilter.split('.');
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: 1,
      _sort: _sort,
      _order: _order,
    }));
  };
  const setNewFilter = (newFilter: ListParams) => {
    // setFilters(newFilter);
    console.log(newFilter);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter filters={filters} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <ProductSort
              currentSort={filters._sort ? `${filters._sort}.${filters._order}` : ''}
              onChange={handleSortChange}
            />
            <FilterByViewer filters={filters} onChange={setNewFilter} />
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
