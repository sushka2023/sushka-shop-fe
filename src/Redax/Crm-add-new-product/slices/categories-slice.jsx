import { createSlice } from "@reduxjs/toolkit";
import { fetchMainCategories, fetchSubCategories } from "../operation/Operation";

const handlePending = (state, action) => {
    state.isLoading = true;
    state.operation = action.meta.arg.operationType;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.operation = null;
    state.error = action.payload;
};

const handleFulfilledMain = (state, action) => {
    state.isLoading = false;
    state.operation = null;
    state.error = null;
    state.mainCategories = action.payload.data;
};

const handleFulfilledSub = (state, action) => {
    state.isLoading = false;
    state.operation = null;
    state.error = null;
    state.subCategories = action.payload.data.filter((category) => category.is_deleted === false);
};

export const categoriesSlice = createSlice({
    name: "allCategories",
    initialState: {
        mainCategories: null,
        subCategories: null,
        isLoading: false,
        operation: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMainCategories.pending, handlePending)
            .addCase(fetchMainCategories.rejected, handleRejected)
            .addCase(fetchMainCategories.fulfilled, handleFulfilledMain)
            .addCase(fetchSubCategories.pending, handlePending)
            .addCase(fetchSubCategories.rejected, handleRejected)
            .addCase(fetchSubCategories.fulfilled, handleFulfilledSub)
    }
});

export default categoriesSlice.reducer;