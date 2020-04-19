// ====== Local Storage Implementation for upvotes and hidden news feed
const upVotedNewsFeedStorageKey = '__hacker_news_app_up_vote_news_feeds';
const hiddenNewsFeedStorageKey = '__hacker_news_app_up_hidden_news_feeds';

function getLocalStorageUpVoteIds() {
  const upVotedNewsFeedIds =
    window.localStorage[upVotedNewsFeedStorageKey] || '[]';
  return JSON.parse(upVotedNewsFeedIds);
}

function getLocalStorageHiddenNewsIds() {
  const hiddenNewsFeedIds =
    window.localStorage[hiddenNewsFeedStorageKey] || '[]';
  return JSON.parse(hiddenNewsFeedIds);
}

function setLocalStorageUpVoteIds(newsFeedId) {
  const upVotedNewsFeedIds = getLocalStorageUpVoteIds();
  if (upVotedNewsFeedIds.indexOf(newsFeedId) === -1) {
    upVotedNewsFeedIds.push(newsFeedId);
    window.localStorage[upVotedNewsFeedStorageKey] = JSON.stringify(
      upVotedNewsFeedIds
    );
  }
}

function setLocalStorageHiddenNewsIds(newsFeedId) {
  const hiddenNewsFeedIds = getLocalStorageHiddenNewsIds();
  if (hiddenNewsFeedIds.indexOf(newsFeedId) === -1) {
    hiddenNewsFeedIds.push(newsFeedId);
    window.localStorage[hiddenNewsFeedStorageKey] = JSON.stringify(
      hiddenNewsFeedIds
    );
  }
}
// ============

export async function voteNewsFeed(newsFeedId) {
  setLocalStorageUpVoteIds(newsFeedId);
  return { success: true };
}

export async function getVotedNewsFeedIds() {
  return getLocalStorageUpVoteIds();
}

export async function hideNewsFeed(newsFeedId) {
  setLocalStorageHiddenNewsIds(newsFeedId);
  return { success: true };
}

export async function getHiddenNewsFeedIds() {
  return getLocalStorageHiddenNewsIds();
}

export async function getUserData() {
  if (typeof window === 'object') {
    const votedNewsFeedIds = await getVotedNewsFeedIds();
    const hiddenNewsFeedIds = await getHiddenNewsFeedIds();
    return { votedNewsFeedIds, hiddenNewsFeedIds };
  }
  return {};
}

export default {
  voteNewsFeed,
  hideNewsFeed,
  getVotedNewsFeedIds,
  getHiddenNewsFeedIds,
  getUserData,
};
