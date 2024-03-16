import { getTurnsClient } from "@/services/turns";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
createAsyncThunk;

const turnsSlice = createSlice({
  name: "turns",
  initialState: [],
  reducers: {
    setTurns(_state, action) {
      return action.payload;
    },
  },
});

export const setTurnsClient = createAsyncThunk(
  "turns/setTurns",
  async (id_user: string, { dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        return dispatch(setTurns([]));
      }
      const body = await getTurnsClient(id_user, token);
      console.log(body.turns);

      dispatch(setTurns(body.turns));
    } catch (error) {
      console.log(error);
    }
  }
);
export const { setTurns } = turnsSlice.actions;
export default turnsSlice.reducer;
