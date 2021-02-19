import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
      state.link = link
    },
  },
  extraReducers: {},
})

export const { addLink } = postLinkInputSlice.actions

export default postLinkInputSlice.reducer
