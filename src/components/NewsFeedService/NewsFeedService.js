import fetch from 'cross-fetch';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

const algoliaApiEndpoint = 'https://hn.algolia.com/api/v1';
const newsFeedSearchEndpoint = `${algoliaApiEndpoint}/search?tags=story`;
const newsFeedSearchByDateEndpoint = `${algoliaApiEndpoint}/search_by_date?tags=story`;
const storyUrls = new Map([
  ['topstories', newsFeedSearchEndpoint],
  ['newstories', newsFeedSearchByDateEndpoint],
]);

function getProcessedNewsFeedData(newsFeedData) {
  const { hits: newsFeedHits = [], page, nbPages, hitsPerPage } = newsFeedData;
  return {
    page,
    nbPages,
    hitsPerPage,
    hits: newsFeedHits.map(newsFeedHit => {
      const {
        author: username,
        num_comments: totalComments,
        title,
        url = '',
        created_at_i: createdAtI,
        points: totalUpVotes,
        objectID,
      } = newsFeedHit;

      const [linkDomain] =
        (url && url.match(/(?!w{1,}\.)(\w+\.?)([a-zA-Z]+)(\.\w+)/)) || [];

      const postedWhen = `${formatDistanceStrict(
        createdAtI * 1000,
        Date.now()
      )} ago`;

      return {
        totalComments,
        totalUpVotes,
        title,
        linkDomain,
        username,
        postedWhen,
        url,
        id: objectID,
      };
    }),
  };
}

function getTimestampOfDays(day) {
  return new Date().setDate(new Date().getDate() - day) / 1000;
}

export async function queryNewsFeed(params) {
  const {
    pageNum = 0,
    hitsPerPage = 30,
    dateRange = 'last24h',
    storyType = 'topstories',
  } = params;
  let filters;

  if (dateRange === 'last24h') {
    filters = `&numericFilters=created_at_i>${getTimestampOfDays(1)}`;
  }

  const apiUrl = storyUrls.get(storyType);
  const url = `${apiUrl}&page=${pageNum}&hitsPerPage=${hitsPerPage}${filters}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const newsFeedData = await response.json();
      return getProcessedNewsFeedData(newsFeedData);
    } else {
      return { error: true };
    }
  } catch (e) {
    return { error: true };
  }
}

export default { queryNewsFeed };
