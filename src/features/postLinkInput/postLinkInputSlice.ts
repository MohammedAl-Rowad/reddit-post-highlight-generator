import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import parse from 'url-parse'
interface postLinkInputState {
  link: string
}

const initialState: postLinkInputState = {
  link: '',
}

const postLinkInputSlice = createSlice({
  name: 'postLinkInput',
  initialState,
  reducers: {
    addLink(state, { payload: link }: PayloadAction<string>) {
      const { origin, pathname } = parse(link)
      state.link = `${origin}${pathname}`
    },
  },
  extraReducers: {},
})

export const { addLink } = postLinkInputSlice.actions

export default postLinkInputSlice.reducer
