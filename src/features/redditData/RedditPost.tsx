import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectSubRedditInfo,
  addSubRedditAbout,
  selectSubbRedditIconUrl,
} from 'features/redditData'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  CardMedia,
  Box,
  CardHeader,
  Avatar,
  makeStyles,
} from '@material-ui/core'
import { Link as LinkIcon } from '@material-ui/icons'
import axios from 'axios'

const reddit = 'https://www.reddit.com'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#1A1A1B',
    color: '#D7DADC',
    '& *': {
      color: '#D7DADC',
    },
  },
  media: {
    height: '100%',
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  avatar: {
    backgroundColor: '#149EF0',
  },
}))

const RedditPost = () => {
  const subRedditData = useSelector(selectSubRedditInfo)
  const iconUrl = useSelector(selectSubbRedditIconUrl)
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    if (subRedditData) {
      axios
        .get(`${reddit}/${subRedditData.subredditNamePrefixed}/about/.json`)
        .then(({ data: { data } }: any) => {
          console.log({ data })
          dispatch(addSubRedditAbout({ iconUrl: data.icon_img }))
        })
    }
  }, [subRedditData])

  if (!subRedditData) {
    return null
  }

  return (
    <Box mt={4}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3} xl={3}></Grid>
        <Grid item xs={12} md={6} xl={6}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={iconUrl}
                >
                  R
                </Avatar>
              }
              title={subRedditData.subredditNamePrefixed}
              action={
                !!subRedditData.linkUrl && (
                  <IconButton aria-label="settings">
                    <LinkIcon />
                  </IconButton>
                )
              }
              subheader={
                <a
                  href={`${reddit}/u/${subRedditData.author}`}
                  rel="noreferrer"
                  target="_blank"
                >{`u/${subRedditData.author}`}</a>
              }
            />
            {!!subRedditData.imgUrl && (
              <CardMedia
                className={classes.media}
                image={subRedditData.imgUrl}
              />
            )}
            <CardContent>
              <Typography variant="h5" color="textSecondary" component="p">
                {subRedditData.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3} xl={3}></Grid>
      </Grid>
    </Box>
  )
}

export default RedditPost
