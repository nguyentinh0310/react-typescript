import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { studentApi } from 'api/studentApi';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
};
export const fetchStudentList: any = createAsyncThunk(
  'student/fetchStudentList',
  async (params: ListParams) => {
    const data = await studentApi.getAll(params);
    return data;
  }
);
const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchStudentList.pending]: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    [fetchStudentList.fulfilled]: (state, action: PayloadAction<ListResponse<Student>>) => {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    [fetchStudentList.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Actions
export const studentActions = studentSlice.actions;
// Selector
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudenLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

// Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
