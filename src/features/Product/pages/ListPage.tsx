import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { productApi } from 'api/productApi';
import { ListParams, Product } from 'models';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
  // history: ko thay đổi, nhưng thay đổi trực tiếp giá trị bên trong history -> (history.location)
  // location: mỗi lần url thay đổi -> trả về object location mới
  const history = useHistory();
  const location = useLocation();

  // chuyển chỗi thành object gán vào filters
  //  khi nào location thay đổi tính lại queryParams
  const queryParams = useMemo(() => {
    const params: any = queryString.parse(location.search);
    // true -> "true"
    // {isPromotion: "true" }
    // xét giá trị mặc định
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 10,
      _sort: params._sort || 'salePrice:ASC',
    };
  }, [location.search]);

  const [productList, setProductList] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 12,
    _totalRows: 12,
  });

  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 12,
  //   _sort: 'salePrice',
  //   _order: 'desc',
  // });
  // useEffect(() => {
  //   // Sync filters to URL
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', productList);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e: any, page: number) => {
    // setFilters((prevFilter) => ({
    //   ...prevFilter,
    //   _page: page,
    // }));

    // mỗi lần page change lấy queryParam hiện tại, đổi page -> push vào history với location.pathname và chuỗi filter mới
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterChange = (newFilter: ListParams) => {
    console.log(newFilter);
    // setFilters((prevFilter) => ({
    //   ...prevFilter,
    //   _page: 1,
    //   ...newFilter,
    // }));
    const filters = {
      ...queryParams,
      _page: 1,
      ...newFilter,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newFilter: ListParams) => {
    const [_sort, _order] = newFilter.split('.');
    // setFilters((prevFilter) => ({
    //   ...prevFilter,
    //   _page: 1,
    //   _sort: _sort,
    //   _order: _order,
    // }));
    const filters = {
      ...queryParams,
      _page: 1,
      _sort: _sort,
      _order: _order,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilter = (newFilter: ListParams) => {
    // setFilters(newFilter);
    history.push({
      pathname: history.location.pathname, // đường dẫn hiện tại
      search: queryString.stringify(newFilter),
    });
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilter filters={queryParams} onChange={handleFilterChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <ProductSort
              currentSort={queryParams._sort ? `${queryParams._sort}.${queryParams._order}` : ''}
              onChange={handleSortChange}
            />
            <FilterByViewer filters={queryParams} onChange={setNewFilter} />
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
