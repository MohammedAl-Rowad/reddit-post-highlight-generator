import React from 'react'
import { PostLinkInput } from 'features/postLinkInput'
import { RedditPost } from 'features/redditData'
import { CustomAppBar } from 'ui/customAppBar'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <CustomAppBar />
      <PostLinkInput />
      <RedditPost />
      <Toaster position="top-center" />
    </>
  )
}

export default App
