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
    linkUrl: checkURLIfForImage(data.url_overridden_by_dest || data.thumbnail)
      ? null
      : data.url_overridden_by_dest,
    imgUrl: checkURLIfForImage(data.url_overridden_by_dest || data.thumbnail)
      ? data.url_overridden_by_dest || data.thumbnail
      : null,
  }))
  return mappedChildren
}

const getTopComments = ({ data: { children } }: any) => {
  const mappedChildren = children.map(({ data }: any) => ({
    body: data.body,
    author: data.author,
  }))
  return mappedChildren
}

const checkURLIfForImage = (url: string) =>
  url.match(/\.(jpeg|jpg|gif|png)$/) !== null
