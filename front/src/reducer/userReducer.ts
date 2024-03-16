import ICredential from "@/interface/credential";
import ITokenUser from "@/interface/tokenUser";
import { login } from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
  },
});

export const setLogedUser = createAsyncThunk(
  "user/setLogedUser",
  async (credential: ICredential, { dispatch }) => {
    try {
      const response = await login(credential);

      const token = jwtDecode(response.token);
      window.localStorage.setItem("token", response.token);
      const {
        birthdate,
        first_name,
        id_user,
        last_name,
        nDni,
        phone,
        profile_image,
        role,
      }: ITokenUser = token as ITokenUser;

      dispatch(
        setUser({
          birthdate,
          first_name,
          id_user,
          last_name,
          nDni,
          phone,
          profile_image,
          role,
        })
      );
    } catch (error) {
      // Manejar el error si la autenticación falla
      console.error("Error en el inicio de sesión:", error);
      // Lanzar el error nuevamente para que pueda ser capturado por el código que despachó esta acción
      throw error;
    }
  }
);

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
