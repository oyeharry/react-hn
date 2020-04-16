import fetch from 'cross-fetch';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

const newsFeedSearchEndpoint =
  'https://hn.algolia.com/api/v1/search?tags=(story,poll)';

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
        id: createdAtI,
      };
    }),
  };
}

export async function queryNewsFeed(page, hitsPerPage = 50) {
  const url = `${newsFeedSearchEndpoint}&page=${page}&hitsPerPage=${hitsPerPage}`;
  const response = await fetch(url);

  const newsFeedData = await response.json();
  return getProcessedNewsFeedData(newsFeedData);
}

export default { queryNewsFeed };
