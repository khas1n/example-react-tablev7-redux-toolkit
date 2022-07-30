import { GetRandomUsersParameters, RandomUser } from "./../../types/random-user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomUsers } from "./../../api/randomUser";
import axios from "axios";
import { ApiResponse, ApiResponseInfo } from "../../types/api-response";

const fetchRandomUsers = createAsyncThunk<ApiResponse<RandomUser[]>, GetRandomUsersParameters, { rejectValue: string }>(
  "randomUser/fetchRandomUsers",
  async (arg: GetRandomUsersParameters, thunkApi) => {
    try {
      const { data } = await getRandomUsers(arg);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      } else {
        return thunkApi.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export interface RandomUserState {
  isLoading: boolean;
  entities: RandomUser[];
  paginationInfo: ApiResponseInfo | null;
  error: string;
}

const initialState: RandomUserState = {
  isLoading: false,
  entities: [],
  paginationInfo: null,
  error: "",
};

export const randomUserSlice = createSlice({
  name: "randomUser",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    randomUserRecieved: (state, action: PayloadAction<RandomUser[]>) => {
      state.entities = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRandomUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload.results.length > 0) {
        state.entities = payload.results;
        state.paginationInfo = payload.info;
      }
    });
    builder.addCase(fetchRandomUsers.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload;
      }
    });
    builder.addCase(fetchRandomUsers.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const randomUserAction = { ...randomUserSlice.actions, fetchRandomUsers };
export default randomUserSlice.reducer;
