import { useState, useEffect } from 'react';
import NewsFeedService from '../NewsFeedService';

let curPageNewsFeedData;

function useNewsFeedData(pageNum = 0, initialNewsFeedData = {}) {
  const [newsFeedDataByPage, setNewsFeedDataByPage] = useState(
    initialNewsFeedData
  );
  const [newsFeedDataLoading, setNewsFeedDataLoading] = useState(false);

  useEffect(() => {
    if (!newsFeedDataByPage[pageNum]) {
      setNewsFeedDataLoading(true);
      NewsFeedService.queryNewsFeed(pageNum)
        .then(fetchedNewsFeedData => {
          setNewsFeedDataByPage({
            ...newsFeedDataByPage,
            [pageNum]: fetchedNewsFeedData,
          });
          setNewsFeedDataLoading(false);
          // window.scrollTo(0, 0);
        })
        .catch(() => {
          setNewsFeedDataLoading(false);
        });
    }
  }, [pageNum]);

  if (newsFeedDataByPage[pageNum]) {
    curPageNewsFeedData = newsFeedDataByPage[pageNum];
  }

  return {
    newsFeedDataLoading,
    newsFeedDataByPage,
    curPageNewsFeedData,
  };
}

export default useNewsFeedData;
