import { RootState } from 'app/store'

export const selectStatus = (state: RootState) => state.redditData.status
export const selectSubRedditInfo = (state: RootState) =>
  state.redditData.data.subRedditInfo
export const selectSubbRedditIconUrl = (state: RootState) =>
  state.redditData.subRedditAbout.iconUrl
