import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit'
import { HTTP_STATUS } from 'types'
import axios from 'axios'
import { mapRedditResponse } from './funcs'
import { redditDataReducer } from '.'

export const fetchRedditData: AsyncThunk<
  Promise<object>,
  string,
  object
> = createAsyncThunk<Promise<object>, string, object>(
  'reddit/fetchRedditData',
  async (link: string): Promise<any> => {
    const { data } = await axios.get(`${link}.json`)
    console.log({ data })
    return mapRedditResponse(data)
  }
)

interface redditDataState {
  data: any
  subRedditAbout: any
  status: HTTP_STATUS | null
}

const initialState: redditDataState = {
  data: {},
  subRedditAbout: {},
  status: null,
}

const redditDataSlice = createSlice({
  name: 'redditData',
  initialState,
  reducers: {
    addSubRedditAbout(state, { payload }: PayloadAction<any>) {
      console.log({ payload })
      state.subRedditAbout = payload
    },
  },
  extraReducers: {
    [fetchRedditData.fulfilled as any](state, { payload }: PayloadAction) {
      state.data = payload
      state.status = 'SUCCESS'
    },
    [fetchRedditData.pending as any](state) {
      state.status = 'PENDING'
    },
    [fetchRedditData.rejected as any](state) {
      state.status = 'FAILED'
    },
  },
})

export const { addSubRedditAbout } = redditDataSlice.actions

export default redditDataSlice.reducer
