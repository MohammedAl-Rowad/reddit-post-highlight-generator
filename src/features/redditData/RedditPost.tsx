import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectSubRedditInfo,
  addSubRedditAbout,
  selectSubbRedditIconUrl,
  selectComments,
} from 'features/redditData'
import axios from 'axios'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import { Post } from 'ui/post'
import { v4 } from 'uuid'

const reddit = 'https://www.reddit.com'

const RedditPost = () => {
  const subRedditData = useSelector(selectSubRedditInfo)
  const comments = useSelector(selectComments)
  const iconUrl = useSelector(selectSubbRedditIconUrl)
  const dispatch = useDispatch()
  useEffect(() => {
    if (subRedditData) {
      axios
        .get(`${reddit}/${subRedditData.subredditNamePrefixed}/about/.json`)
        .then(({ data: { data } }: any) => {
          dispatch(addSubRedditAbout({ iconUrl: data.icon_img }))
        })
    }
  }, [subRedditData])

  const onDownload = useCallback((uuid: string) => {
    html2canvas(document.getElementById(uuid) as HTMLElement, {
      letterRendering: true,
      // allowTaint: true,
      useCORS: true,
      logging: true,
    }).then((canvas) => {
      saveAs(canvas.toDataURL(), `${v4()}.png`)
    })
  }, [])

  if (!subRedditData) {
    return null
  }

  return (
    <>
      <Post
        onDownload={onDownload}
        iconUrl={iconUrl}
        linkUrl={subRedditData.linkUrl}
        subredditNamePrefixed={subRedditData.subredditNamePrefixed}
        author={subRedditData.author}
        title={subRedditData.title}
        imgUrl={subRedditData.imgUrl}
      />
      {comments.map((comment: any) => (
        <Post
          key={comments.title}
          isComment={true}
          onDownload={onDownload}
          linkUrl={subRedditData.linkUrl}
          subredditNamePrefixed={subRedditData.subredditNamePrefixed}
          author={comment.author}
          title={comment.body}
        />
      ))}
    </>
  )
}

export default RedditPost
