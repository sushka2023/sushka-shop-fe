import { createAsyncThunk } from '@reduxjs/toolkit';
import applicationApi from '../../Auth/operation/Operation';


export const fetchUser = createAsyncThunk('user/fetchUser', async (values, { rejectWithValue }) => {
    try {
        const result = await applicationApi.getCurrentUser()
        return result;
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
})