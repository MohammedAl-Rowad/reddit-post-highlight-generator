import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectSubRedditInfo,
  addSubRedditAbout,
  selectSubbRedditIconUrl,
} from 'features/redditData'
import { red } from '@material-ui/core/colors'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
  CardHeader,
  Avatar,
  makeStyles,
} from '@material-ui/core'
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
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
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
        <Grid item xs={12} md={4} xl={4}></Grid>
        <Grid item xs={12} md={4} xl={4}>
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
              <Typography variant="h4" color="textSecondary" component="p">
                {subRedditData.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} xl={4}></Grid>
      </Grid>
    </Box>
  )
}

export default RedditPost
