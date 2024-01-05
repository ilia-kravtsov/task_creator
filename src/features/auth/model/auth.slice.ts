import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {appActions} from "app/app.reducer";
import {authAPI, LoginParamsType} from "features/auth/api/auth.api";
import {clearTasksAndTodolists} from "common/actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch} from "common/utils";
import {ResultCode} from "common/enums";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      const isShowAppError = !res.data.fieldsErrors.length;
      // handleServerAppError(res.data, dispatch, isShowAppError);
      return rejectWithValue(res.data);
    }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

// const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
//   const { dispatch, rejectWithValue } = thunkAPI;
//   try {
//     const res = await authAPI.me();
//     if (res.data.resultCode === ResultCode.Success) {
//       return { isLoggedIn: true };
//     } else {
//       return rejectWithValue(null);
//     }
//   } catch (e) {
//     handleServerNetworkError(e, dispatch);
//     return rejectWithValue(null);
//   } finally {
//     dispatch(appActions.setAppInitialized({ isInitialized: true }));
//   }
// });

const initializeApp = createAppAsyncThunk<{isLoggedIn: boolean},undefined>('auth/initializeApp',async(_,thunkAPI) => {
  const {rejectWithValue} = thunkAPI;
  const res = await authAPI.me()
  if(res.data.resultCode === 0) {
    return {isLoggedIn: true}
  } else {
    return rejectWithValue(res.data)
  }

})

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      // .addCase(logout.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })
      // .addCase(initializeApp.fulfilled, (state, action) => {
      //   state.isLoggedIn = action.payload.isLoggedIn;
      // })

        // .addMatcher((action: AnyAction) => {
        //   if (action.type === 'auth/login/fulfilled' ||
        //       action.type === 'auth/logout/fulfilled' ||
        //       action.type === 'app/initializeApp/fulfilled') {
        //     return true
        //   } else {
        //     return false
        //   }
        // }, (state, action) => {
        //   state.isLoggedIn = action.payload.isLoggedIn;
        // })

        .addMatcher(isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled), (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        })
  },
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
