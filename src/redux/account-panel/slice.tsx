import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SelectedValueState {
  value: string
}

const initialState: SelectedValueState = {
  value: 'ukr_post'
}

export const valuePostSlice = createSlice({
  name: 'selectedValue',
  initialState,
  reducers: {
    addPostValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { addPostValue } = valuePostSlice.actions
export const selectPostValue = (state: any) => state.selectedValue.value

export default valuePostSlice.reducer
