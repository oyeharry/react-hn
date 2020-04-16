import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Box from '../components/Box';
import Text from '../components/Text';
import Anchor from '../components/Anchor';
import NewsFeed from '../components/NewsFeed';
import NewsFeedService from '../components/NewsFeedService';

export async function getServerSideProps(req) {
  const { params } = req;
  const pageNum = params.pageNum || 0;
  const newsFeedPageData = await NewsFeedService.queryNewsFeed(
    params.pageNum || 0
  );

  return {
    props: {
      newsFeedData: { [pageNum]: newsFeedPageData },
    },
  };
}

function News(props) {
  const { newsFeedData } = props;
  const { pageNum = 0 } = useParams();
  const [newsFeedDataByPage, setNewsFeedDataByPage] = useState(newsFeedData);
  const [newsFeedDataLoading, setNewsFeedDataLoading] = useState(false);
  const [curPageNewsFeedData, setCurPageNewsFeedData] = useState({ hits: [] });

  useEffect(() => {
    if (!newsFeedDataByPage[pageNum]) {
      setNewsFeedDataLoading(true);
      NewsFeedService.queryNewsFeed(pageNum)
        .then((fetchedNewsFeedData) => {
          setNewsFeedDataByPage({
            ...newsFeedDataByPage,
            [pageNum]: fetchedNewsFeedData,
          });
          setNewsFeedDataLoading(false);
        })
        .catch(() => {
          setNewsFeedDataLoading(false);
        });
    }
  }, [pageNum]);

  useEffect(() => {
    const curPageNewsFeedData = newsFeedDataByPage[pageNum] || { hits: [] };
    setCurPageNewsFeedData(curPageNewsFeedData);
  }, [newsFeedDataByPage]);

  return (
    <Box pt="3" bg="springWood">
      {curPageNewsFeedData.hits.map((newsFeedHit, index) => {
        const {
          totalComments,
          totalUpVotes,
          title,
          linkDomain,
          username,
          postedWhen,
          id,
          url,
        } = newsFeedHit;

        return (
          <NewsFeed
            highlighted={index % 2 !== 0}
            key={id}
            totalComments={totalComments}
            totalUpVotes={totalUpVotes}
            title={title}
            linkDomain={linkDomain}
            username={username}
            postedWhen={postedWhen}
            url={url}
          />
        );
      })}
      <Box ml="13%">
        {newsFeedDataLoading ? (
          <Text p="2">Loading...</Text>
        ) : (
          <Anchor
            color="primary.main"
            to={`/news/${parseInt(pageNum, 10) + 1}`}
          >
            More
          </Anchor>
        )}
      </Box>
    </Box>
  );
}

News.propTypes = {
  pageNum: PropTypes.string,
  newsFeedData: PropTypes.shape({
    hits: PropTypes.arrayOf(PropTypes.object),
  }),
};

News.defaultProps = {
  pageNum: '0',
  newsFeedData: { hits: [] },
};

export default News;
