import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const URL = "https://jsonplaceholder.typicode.com/posts";
const reduxStatus = {
  Idle: "idle",
  Loading: "loading",
  Failed: "failed",
  Success: "success"
}
const initState = {
  data: [],
  status: reduxStatus.Idle,
  error: null
}
export const fetchData = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(URL)
    return [...res.data]
  } catch (e) {
    return e.message;
  }
}
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = reduxStatus.Loading
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = reduxStatus.Success
        state.data = action.payload
      })
      .addCase(fetchData.rejected,(state,action)=>{
        state.status=reduxStatus.Failed
        state.error=action.error.message
      })
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
