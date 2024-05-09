import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SelectedValueState {
  value: string
  event: object
  flag: boolean
}

const initialState: SelectedValueState = {
  value: 'np_office',
  event: {},
  flag: false
}

export const valuePostSlice = createSlice({
  name: 'selectedValue',
  initialState,
  reducers: {
    postValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    eventEditPost: (state, action: PayloadAction<any>) => {
      state.event = action.payload
    },
    flagAddPost: (state, action: PayloadAction<boolean>) => {
      state.flag = action.payload
    }
  }
})

export const { postValue, eventEditPost, flagAddPost } = valuePostSlice.actions
export const selectPostValue = (state: any) => state.selectedValue.value
export const selectEditPost = (state: any) => state.selectedValue.event
export const selectFlagAddPost = (state: any) => state.selectedValue.flag

export default valuePostSlice.reducer
