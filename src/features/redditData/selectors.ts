import { RootState } from 'app/store'

export const selectStatus = (state: RootState) => state.redditData.status
