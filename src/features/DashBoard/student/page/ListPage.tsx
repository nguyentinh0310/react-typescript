import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { studentApi } from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchCity, selectCityMap } from 'features/DashBoard/city/citySlice';
import { Student } from 'models';
import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentTable from '../components/StudentTable';
import {
  fetchStudentList,
  selectStudenLoading,
  selectStudentFilter,
  selectStudentList,
  selectStudentPagination,
  studentActions
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
    width: '80%',
    margin: '0 auto',
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(0),
    width: '100%',
  },
}));
export default function ListPage() {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const loading = useAppSelector(selectStudenLoading);
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);

  
  useEffect(() => {
    dispatch(fetchStudentList(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(fetchCity());
  }, [dispatch]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      console.log(student);
      await studentApi.remove(student?.id || '');
      toast.success('Remove student successfully!');

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log('Failed to fetch student', error);
    }
  };

  const handleEditStudent = (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Link to={`${match.path}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      {/* <Box mb={3}>
      <StudentFilters
        filter={filter}
        cityList={cityList}
        onChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
    </Box>*/}

      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
