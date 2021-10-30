import { createAsyncThunk, createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { cityApi } from 'api/cityApi';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};
export const fetchCity: any = createAsyncThunk('city/fetchCity', async () => {
  const data = await cityApi.getAll();
  return data;
});
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCity.pending]: (state) => {
      state.loading = true;
    },
    [fetchCity.fulfilled]: (state, action: PayloadAction<ListResponse<City>>) => {
      state.loading = false;
      state.list = action.payload.data;
    },
    [fetchCity.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Actions
export const cityActions = citySlice.actions;

// Selectors
export const selectCityList = (state: RootState) => state.city.list;

export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    console.log(map, city);
    map[city.code] = city;
    return map;
  }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
