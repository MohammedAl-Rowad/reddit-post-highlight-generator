import React, { memo, useState, useCallback, useEffect } from 'react'
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
import {
  LinkRounded as LinkRoundedIcon,
  ImageRounded as ImageRoundedIcon,
} from '@material-ui/icons'
import { v4 } from 'uuid'
import axios from 'axios'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#1A1A1B',
    color: '#D7DADC',
    '& *': {
      color: '#D7DADC',
    },
  },
  media: {
    height: '40vh',
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  avatar: {
    backgroundColor: '#149EF0',
  },
}))

interface Props {
  onDownload: (uuid: string) => void
  iconUrl?: string
  subredditNamePrefixed: string
  linkUrl: string
  author: string
  title: string
  imgUrl?: string
  isComment?: boolean
}
const reddit = 'https://www.reddit.com'

const Post = ({
  onDownload,
  iconUrl,
  subredditNamePrefixed,
  linkUrl,
  author,
  title,
  imgUrl,
  isComment = false,
}: Props) => {
  const classes = useStyles()
  const [uuid] = useState(v4())
  const [userImage, setUserImage] = useState('')
  const onDownloadClick = useCallback(() => onDownload(uuid), [
    uuid,
    onDownload,
  ])
  useEffect(() => {
    if (isComment) {
      axios
        .get(`${reddit}/user/${author}/about/.json`)
        .then(({ data: { data } }: any) => {
          setUserImage(data.snoovatar_img || data.icon_img)
        })
    }
  }, [isComment])

  return (
    <Box mt={4}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3} xl={3} justify="flex-end" container>
          <Box>
            <IconButton
              aria-label="download"
              size="medium"
              onClick={onDownloadClick}
            >
              <ImageRoundedIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} xl={6}>
          <Card className={classes.root} id={uuid}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={iconUrl || userImage}
                >
                  {isComment ? 'U' : 'R'}
                </Avatar>
              }
              title={
                isComment ? (
                  <a
                    href={`${reddit}/u/${author}`}
                    rel="noreferrer"
                    target="_blank"
                  >{`u/${author}`}</a>
                ) : (
                  subredditNamePrefixed
                )
              }
              action={
                !!linkUrl && (
                  <IconButton aria-label="settings">
                    <LinkRoundedIcon />
                  </IconButton>
                )
              }
              subheader={
                isComment ? (
                  ''
                ) : (
                  <a
                    href={`${reddit}/u/${author}`}
                    rel="noreferrer"
                    target="_blank"
                  >{`u/${author}`}</a>
                )
              }
            />
            <CardContent>
              <Typography variant="h5" color="textSecondary" component="p">
                {title}
              </Typography>
            </CardContent>
            {!!imgUrl && <CardMedia className={classes.media} image={imgUrl} />}
          </Card>
        </Grid>
        <Grid item xs={12} md={3} xl={3}></Grid>
      </Grid>
    </Box>
  )
}

export default memo(Post)
