
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  users: [], 
  user:{},
  accesToken: null,
  error: false
};


export const registerUser = createAsyncThunk(
  // action type string
  "userSlice/registerUser",
  // callback function
  async ({ userName, password, confirmPassword }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: userName, password: password, confirmPassword: confirmPassword }),
      };
      // make request to backend
      const res = await fetch("/api/auth/register", config).then((data) =>
        data.json()
      );
      if (res) {
        const userData = {
          userId: res.id,
          token: res.token,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        return res;
      }
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const loginUser = createAsyncThunk(
  // action type string
  "userSlice/loginUser",
  // callback function
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName:userName, password:password }),
      };
      // make request to backend
      const res = await fetch("/api/auth/login", config)
        .then((data) => data.json())
        if (res) {
          const userData={
            userId:res.id,
            token: res.token,
          }
        localStorage.setItem("user", JSON.stringify(userData));
        return res;
        }
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } 
      else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const logout = () => {
  localStorage.removeItem("user");
};

export const getUsers = createAsyncThunk(
  //action type string
  "userSlice/getUsers",
  // callback function
  async () => {
    const res = await fetch("/api/users").then((data) => data.json())
    return res;
  }
);

export const getOneUser = createAsyncThunk(
  //action type string
  "userSlice/getOneUser",
  // callback function
  async (id) => {
    const res = await fetch(`/api/users/${id}`).then((data) => data.json());
    return res;
  }
);


const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.users = payload;
    },
    [getUsers.rejected]: (state) => {
      state.error = true;
    },

    [getOneUser.pending]: (state) => {
      state.loading = true;
    },
    [getOneUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.user = payload;
    },
    [getOneUser.rejected]: (state) => {
      state.error = true;
    },

    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.user = payload;
      state.accesToken = payload.token;
    },
    [registerUser.rejected]: (state) => {
      state.error = true;
    },

    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.user = payload;
      state.accesToken = payload.token;
    },
    [loginUser.rejected]: (state) => {
      state.error = true;
    },
  },
});


export default userSlice.reducer;