import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { postLinkInputReducer } from 'features/postLinkInput'
import { redditDataReducer } from 'features/redditData'

export const store = configureStore({
  reducer: {
    postLinkInput: postLinkInputReducer,
    redditData: redditDataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
