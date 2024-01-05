import {
  AnyAction,
  createSlice,
  isAnyOf,
  isAsyncThunkAction,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction
} from "@reduxjs/toolkit";
import {authThunks} from "features/auth/model/auth.slice";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    //     .addMatcher((action: AnyAction) => { // функция предикат, если true попадаем во второй параметр reducer
    //   console.log('predicat', action.type)
    //   return action.type.endsWith('/pending')
    // }, (state, action) => {
    //   console.log('reducer', action.type)
    //   state.status = 'loading'
    // })
        // в параметрах isPending принимает только ту сущность которая должна отрабатывать остальные не будут
        // isPending(todolistsThunks.fetchTodolists, tasksThunks.addTask)
    builder
        .addMatcher(isPending(), (state, action) => {
          console.log('reducer', action.type)
          state.status = 'loading'
        })
        .addMatcher(isFulfilled,(state) => {
          state.status = 'succeeded'
        })
        .addMatcher(isRejected,(state, action: AnyAction) => {
          state.status = 'failed'
          if (action.payload) {
            //if (action.type === "todo/addTodolist/rejected") return;
            if (action.type.includes("addTodolist") || action.type.includes("addTask") || action.type.includes("initializeApp")) return;
            // if (isAnyOf(todolistsThunks.addTodolist.rejected)) return;
            state.error = action.payload.messages[0]
          } else {
            state.error = action.error.message ? action.error.message : 'Some error occurred'
          }
        })
        // .addMatcher(isAsyncThunkAction(authThunks.initializeApp),(state, action) => {
        //   state.isInitialized = true
        // })
        .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected),(state, action) => {
          state.isInitialized = true
        })
        .addDefaultCase((state, action) => {
          console.log('addDefaultCase ')
        })
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
