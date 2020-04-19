import { useState, useEffect } from 'react';
import UserService from '../UserService';

function useUserData(initialUserData = {}) {
  const [userData, setUserData] = useState(initialUserData);
  const [userDataLoading, setUserDataLoading] = useState(false);

  useEffect(() => {
    if (!userData.votedNewsFeedIds || !userData.hiddenNewsFeedIds) {
      setUserDataLoading(true);
      UserService.getUserData().then(
        ({ votedNewsFeedIds, hiddenNewsFeedIds }) => {
          setUserData({ ...userData, votedNewsFeedIds, hiddenNewsFeedIds });
          setUserDataLoading(false);
        }
      );
    }
  }, [userData]);

  const voteNewsFeedOfId = id => {
    UserService.voteNewsFeed(id).then(response => {
      if (response.success) {
        userData.votedNewsFeedIds.push(id);
        setUserData({ ...userData });
      }
    });
  };

  const hideNewsFeedOfId = id => {
    UserService.hideNewsFeed(id).then(response => {
      if (response.success) {
        userData.hiddenNewsFeedIds.push(id);
        setUserData({ ...userData });
      }
    });
  };

  return { userDataLoading, userData, voteNewsFeedOfId, hideNewsFeedOfId };
}

export default useUserData;
