import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
});

// const initialState = {
//   filters: [],
//   filtersLoadingStatus: 'idle',
//   activeFilter: 'all'
// }

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async () => {
    const {request} = useHttp();
    return await request("http://localhost:3001/filters");
  }
);

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersChanged: (state, action) => {
        state.activeFilter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = 'idle';
        console.log('FILTERS action.payload = ', action.payload);
        // state.filters = action.payload;
        filtersAdapter.setAll(state, action.payload)
      })
      .addCase(fetchFilters.rejected, state => {
        state.filtersLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = filterSlice;

const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const getAllFilters = createSelector(
  selectAll,
  (filters) => filters
)
export const getActiveFilter = createSelector(
  (state) => state.filters.activeFilter,
  (activeFilter) => activeFilter
)

export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filtersChanged
} = actions;