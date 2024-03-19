import ITurn, { EState } from "@/interfaces/ITurn";
import {
  cancelTurnClient,
  createTurnClient,
  getTurnsClient,
} from "@/services/turns";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
createAsyncThunk;

const initialState: ITurn[] = [];

const turnsSlice = createSlice({
  name: "turns",
  initialState,
  reducers: {
    setTurns(_state, action) {
      return action.payload;
    },
    addTurn(state, action) {
      return state.concat(action.payload);
    },
    cancelTurnSlice(state, action) {
      const idToSearch = action.payload;
      return state.map((turn) =>
        turn.id_turn === idToSearch ? { ...turn, state: EState.CANCELED } : turn
      );
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

export const addTurnClient = createAsyncThunk(
  "turns/addTurn",
  async (turn: ITurn, { dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        return dispatch(setTurns([]));
      }
      const data = await createTurnClient(turn, token);

      dispatch(addTurn(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const cancelTurn = createAsyncThunk(
  "turns/cancelTurn",
  async (id_turn: string, { dispatch }) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        return dispatch(setTurns([]));
      }
      const data = await cancelTurnClient(id_turn, token);

      console.log(data);

      dispatch(cancelTurnSlice(id_turn));
    } catch (error) {
      console.log(error);
    }
  }
);
export const { setTurns, addTurn, cancelTurnSlice } = turnsSlice.actions;
export default turnsSlice.reducer;
