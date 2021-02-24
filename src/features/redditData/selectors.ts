import { RootState } from 'app/store'

export const selectStatus = (state: RootState) => state.redditData.status
export const selectSubRedditInfo = (state: RootState) =>
  state.redditData.data.subRedditInfo

export const selectComments = (state: RootState) =>
  state.redditData.data.comments?.slice(0, 10)

export const selectSubbRedditIconUrl = (state: RootState) =>
  state.redditData.subRedditAbout.iconUrl
