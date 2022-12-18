import { createSlice } from '@reduxjs/toolkit'

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    value: ""
  },
  reducers: {
    setSearch: (state,action) => {
        state.value = action.payload.searchText;
    }
  }
}) 

export const {setSearch} = SearchSlice.actions;
export default SearchSlice.reducer;