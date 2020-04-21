import { useState, useEffect } from 'react';
import NewsFeedService from '../NewsFeedService';

let curPageNewsFeedData;

function useNewsFeedData({ pageNum, storyType, initialNewsFeedData = {} }) {
  const [newsFeedDataByPage, setNewsFeedDataByPage] = useState(
    initialNewsFeedData
  );
  const [newsFeedDataLoading, setNewsFeedDataLoading] = useState(false);
  const curPageDataKey = `${storyType}_${pageNum}`;

  useEffect(() => {
    if (!newsFeedDataByPage[curPageDataKey]) {
      setNewsFeedDataLoading(true);
      const [curStoryType, curPageNum] = curPageDataKey.split('_');
      NewsFeedService.queryNewsFeed({
        pageNum: curPageNum,
        storyType: curStoryType,
      })
        .then(fetchedNewsFeedData => {
          setNewsFeedDataByPage({
            ...newsFeedDataByPage,
            [curPageDataKey]: fetchedNewsFeedData,
          });
          setNewsFeedDataLoading(false);
        })
        .catch(() => {
          setNewsFeedDataLoading(false);
        });
    }
  }, [newsFeedDataByPage, curPageDataKey]);

  if (newsFeedDataByPage[curPageDataKey]) {
    curPageNewsFeedData = newsFeedDataByPage[curPageDataKey];
  }

  return {
    newsFeedDataLoading,
    newsFeedDataByPage,
    curPageNewsFeedData,
  };
}

export default useNewsFeedData;
