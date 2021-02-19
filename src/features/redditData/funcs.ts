export const mapRedditResponse = ([list01, list02]: Array<object>) => {
  return {
    subRedditInfo: getSubRedditInfo(list01),
    comments: getTopComments(list02),
  }
}

const getSubRedditInfo = ({ data: { children } }: any) => {
  const [mappedChildren] = children.map(({ data }: any) => ({
    subredditNamePrefixed: data.subreddit_name_prefixed,
    author: data.author,
    url: data.url,
    title: data.title,
    body: data.body,
    numComments: data.num_comments,
    imgUrl: data.url_overridden_by_dest,
  }))
  return mappedChildren
}

const getTopComments = ({ data: { children } }: any) => {
  const mappedChildren = children.map(({ data }: any) => ({
    body: data.body,
  }))
  return mappedChildren
}
