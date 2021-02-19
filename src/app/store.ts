import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { postLinkInputReducer } from 'features/postLinkInput'

export const store = configureStore({
  reducer: {
    postLinkInput: postLinkInputReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
