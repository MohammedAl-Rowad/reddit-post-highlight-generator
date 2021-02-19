import { RootState } from 'app/store'

export const selectLink = (state: RootState) => state.postLinkInput.link
