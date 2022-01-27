// DUCKS pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // increment
    incremented(state) {
      state.count++
    },
    // decrement
    decremented(state) {
      state.count--
    },
    // reset
    reseted(state) {
      state.count=0
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.count += action.payload
    }
  }
})

export const { 
  incremented,
  decremented,
  reseted,
  amountAdded,
} = counterSlice.actions

export default counterSlice.reducer