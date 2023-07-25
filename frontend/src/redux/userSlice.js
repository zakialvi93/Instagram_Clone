import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
  const { email, password } = user;

  return axios
    .post("http://localhost:8080/signin", { email, password })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((error) => {
      return thunkAPI.rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    });
});

export const register = createAsyncThunk(
  "users/register",
  async (user, thunkAPI) => {
    const { fullName, email, password } = user;

    return axios
      .post("http://localhost:8080/signup", {
        fullName,
        email,
        password,
        
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("User Registered");
          return res.data;
        }
      })
      .catch((error) => {
        console.log("ERORRR--->>>>", error.message);
        return thunkAPI.rejectWithValue(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      });
  }
);

export const search = createAsyncThunk(
  "users/search",
  async (data, thunkAPI) => {
    console.log("-----------TOKENN--->", initialState.token);

    const { keyword } = data;

    return axios
      .post(
        "http://localhost:8080/actions/search",
        {
          value: keyword,
        },
        {
          headers: {
            Authorization: `Bearer ${initialState.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          
          return res.data;
        }
      })
      .catch((error) => {
        console.log("ERORRR--->>>>", error.message);

        return thunkAPI.rejectWithValue(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      });
  }
);

export const followApi = createAsyncThunk(
  "users/follow",
  async (data, thunkAPI) => {
    console.log("-----------TOKENN--->", initialState.token);

    const { myId, id } = data;

    return axios
      .post(
        "http://localhost:8080/actions/follow",
        {
          myId,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${initialState.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("User Followed");
          
          return res.data;
        }
      })
      .catch((error) => {
        console.log("ERORRR--->>>>", error.message);

        return thunkAPI.rejectWithValue(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      });
  }
);

export const unfollowApi = createAsyncThunk(
  "users/unfollow",
  async (data, thunkAPI) => {
    console.log("-----------TOKENN--->", initialState.token);

    const { myId, id, x } = data;

    return axios
      .post(
        "http://localhost:8080/actions/unfollow",
        {
          myId,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${initialState.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          x
            ? toast.success("Follower Removed")
            : toast.success("User Unfollowed");
          

          return res.data;
        }
      })
      .catch((error) => {
        console.log("ERORRR--->>>>", error.message);

        return thunkAPI.rejectWithValue(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      });
  }
);

export const getFollowers = createAsyncThunk(
  "users/getfollowers",
  async (data, thunkAPI) => {
    console.log("-----------TOKENN--->", initialState.token);

    const { id } = data;

    return axios
      .post(
        "http://localhost:8080/actions/getfollowers",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${initialState.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((error) => {
        console.log("ERORRR--->>>>", error.message);

        return thunkAPI.rejectWithValue(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      });
  }
);

export const getFollowing = createAsyncThunk(
  "users/getFollowing",
  async (data, thunkAPI) => {
    console.log("-----------TOKENN--->", initialState.token);

    const { id } = data;

    return axios
      .post(
        "http://localhost:8080/actions/getFollowing",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${initialState.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((error) => {
        console.log("ERORRR--->>>>", error.message);

        return thunkAPI.rejectWithValue(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      });
  }
);

const initialState = {
  loading: false,
  error: false,
  message: "",
  userSearchResult: {},
  searchData: [],
  followers: [],
  following: [],
  goToSearch: false,

  reRenderSearchApi: false,

  userInfoFromLocalStorage: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: {
    [login.pending]: (state) => {
      console.log("Pending...", state);
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      console.log("Fulfilled-->", action.payload);
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.goToSearch = true;

      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.accessToken));

      
    },
    [login.rejected]: (state, action) => {
      state.error = true;
      console.log("Rejected-->", action.payload);
      state.loading = false;
      state.message = action.payload;
    },

    [register.pending]: (state) => {
      console.log("Pending...", state);
      state.loading = true;
    },
    [register.fulfilled]: (state, { payload }) => {
      console.log("Fulfilled-->", payload);
      state.loading = false;
      state.error = false;
      state.message = payload.message;
    },
    [register.rejected]: (state, action) => {
      state.error = true;
      console.log("Rejected-->", action.payload);
      state.loading = false;
      state.message = action.payload;
    },

    [search.pending]: (state) => {
      console.log("Pending...", state);
      state.loading = true;
    },
    [search.fulfilled]: (state, action) => {
      console.log("Fulfilled-->", action.payload);
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.searchData = action.payload.userData;
      state.reRenderSearchApi = false;
    },
    [search.rejected]: (state, action) => {
      state.error = true;
      console.log("Rejected-->", action.payload);
      state.loading = false;
      state.message = action.payload;
    },

    [followApi.pending]: (state) => {
      console.log("Pending...", state);
      state.loading = true;
    },
    [followApi.fulfilled]: (state, action) => {
      console.log("Fulfilled-->", action.payload);
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.reRenderSearchApi = true;
    },
    [followApi.rejected]: (state, action) => {
      state.error = true;
      console.log("Rejected-->", action.payload);
      state.loading = false;
      state.message = action.payload;
    },

    [unfollowApi.pending]: (state) => {
      console.log("Pending...", state);
      state.loading = true;
    },
    [unfollowApi.fulfilled]: (state, action) => {
      console.log("Fulfilled-->", action.payload);
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.reRenderSearchApi = true;
    },
    [unfollowApi.rejected]: (state, action) => {
      state.error = true;
      console.log("Rejected-->", action.payload);
      state.loading = false;
      state.message = action.payload;
    },

    [getFollowers.pending]: (state) => {
      console.log("Pending...", state);
      state.loading = true;
    },
    [getFollowers.fulfilled]: (state, action) => {
      console.log("Fulfilled-->", action.payload);
      state.loading = false;
      state.error = false;
      state.message = action.payload.message;
      state.followers = action.payload.userData;
    },
    [getFollowers.rejected]: (state, action) => {
      state.error = true;
      state.reRenderSearchApi = false;
      console.log("Rejected-->", action.payload);
      state.loading = false;
      state.message = action.payload;
    },

    [getFollowing.pending]: (state) => {
      console.log("Pending...", state);
      state.loading = true;
    },
    [getFollowing.fulfilled]: (state, action) => {
      console.log("Fulfilled-->", action.payload);
      state.loading = false;
      state.reRenderSearchApi = false;
      state.error = false;
      state.message = action.payload.message;
      state.following = action.payload.userData;
    },
    [getFollowing.rejected]: (state, action) => {
      state.error = true;
      console.log("Rejected-->", action.payload);
      state.loading = false;
      state.message = action.payload;
    },
  },
});
