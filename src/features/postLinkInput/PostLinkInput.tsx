import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Grid,
  TextField,
  Box,
  InputAdornment,
  Chip,
  Fab,
  Tooltip,
} from '@material-ui/core'
import {
  Reddit as RedditIcon,
  ErrorRounded as ErrorRoundedIcon,
  EmojiNatureRounded as EmojiNatureRoundedIcon,
} from '@material-ui/icons'
import { useDebouncedCallback } from 'use-debounce'
import { addLink, selectLink } from 'features/postLinkInput'
import { fetchRedditData, selectStatus } from 'features/redditData'
import { isUri } from 'valid-url'
import { toast } from 'react-hot-toast'
import { HTTP_STATUS } from 'types'

const PostLinkInput = () => {
  const dispatch = useDispatch()
  const storeLink: string = useSelector(selectLink)
  const httpStatus: HTTP_STATUS | null = useSelector(selectStatus)
  const [error, setError] = useState<string>('')
  const addLinkToStore = useDebouncedCallback((text: string) => {
    if (isUri(text)) {
      dispatch(addLink(text))
      setError('')
    } else {
      setError('Not a valid URL!')
    }
  }, 300)

  return (
    <Box mt={4}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} xl={4}></Grid>
        <Grid item xs={12} md={4} xl={4}>
          <Box display="flex">
            <TextField
              error={!!error}
              variant="outlined"
              fullWidth
              helperText="Paste a link to a reddit post here then hit the button"
              onChange={({ target: { value } }) =>
                addLinkToStore.callback(value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RedditIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box ml={2}>
              <Tooltip title="Generate Post HighLights">
                <span>
                  <Fab
                    color="primary"
                    onClick={() => {
                      toast.promise(
                        dispatch(fetchRedditData(storeLink)) as any,
                        {
                          loading: <i>Fetching data...</i>,
                          success: (data: any) => {
                            if (data.error) {
                              throw new Error()
                            } else {
                              return (
                                <b>
                                  <i>Fetched Data</i>
                                </b>
                              )
                            }
                          },
                          error: <b>Something went wrong!</b>,
                        }
                      )
                    }}
                    aria-label="Generate Post HighLights"
                    disabled={httpStatus === 'PENDING' || !!error || !storeLink}
                  >
                    <EmojiNatureRoundedIcon />
                  </Fab>
                </span>
              </Tooltip>
            </Box>
          </Box>
          {!!error && (
            <Chip
              label={error}
              color="secondary"
              variant="outlined"
              icon={<ErrorRoundedIcon />}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4} xl={4}></Grid>
      </Grid>
    </Box>
  )
}

export default PostLinkInput
