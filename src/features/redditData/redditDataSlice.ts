import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit'
import { HTTP_STATUS } from 'types'
import axios, { AxiosResponse } from 'axios'

export const fetchRedditData: AsyncThunk<
  Promise<object>,
  string,
  object
> = createAsyncThunk<Promise<object>, string, object>(
  'reddit/fetchRedditData',
  async (link: string): Promise<AxiosResponse> => {
    const { data } = await axios.get(`${link}.json`)
    return data as Promise<AxiosResponse>
  }
)

interface redditDataState {
  data: any
  status: HTTP_STATUS | null
}

const initialState: redditDataState = {
  data: {},
  status: null,
}

const redditDataSlice = createSlice({
  name: 'redditData',
  initialState,
  reducers: {},
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

export default redditDataSlice.reducer
