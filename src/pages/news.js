import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Box from '../components/Box';
import Text from '../components/Text';
import Anchor from '../components/Anchor';
import NewsFeed from '../components/NewsFeed';
import NewsFeedService from '../components/NewsFeedService';
import UserService from '../components/UserService';
import useNewsFeedData from '../components/useNewsFeedData';

export async function getServerSideProps(req) {
  const { params } = req;
  const pageNum = params.pageNum || 0;
  const newsFeedPageData = await NewsFeedService.queryNewsFeed(
    params.pageNum || 0
  );

  return {
    props: {
      newsFeedData: { [pageNum]: newsFeedPageData },
      // votedNewsFeedIds and hiddenNewsFeedIds Should be updated once service integrated
      // userData: { votedNewsFeedIds: null, hiddenNewsFeedIds: null },
      userData: {},
    },
  };
}

function News(props) {
  const { newsFeedData, userData: appUserData } = props;
  const { pageNum = 0 } = useParams();
  const [userData, setUserData] = useState(appUserData);

  const { newsFeedDataLoading, curPageNewsFeedData } = useNewsFeedData(
    pageNum,
    newsFeedData
  );

  const {
    votedNewsFeedIds: userVotedNewsFeedIds = [],
    hiddenNewsFeedIds: userHiddenNewsFeedIds = [],
  } = userData || {};

  const onUpVoteButtonClick = id => {
    UserService.voteNewsFeed(id).then(response => {
      if (response.success) {
        userData.votedNewsFeedIds.push(id);
        setUserData({ ...userData });
      }
    });
  };

  const onHideButtonClick = id => {
    UserService.hideNewsFeed(id).then(response => {
      if (response.success) {
        userData.hiddenNewsFeedIds.push(id);
        setUserData({ ...userData });
      }
    });
  };

  useEffect(() => {
    if (!userData.votedNewsFeedIds || !userData.hiddenNewsFeedIds) {
      Promise.all([
        UserService.getVotedNewsFeedIds(),
        UserService.getHiddenNewsFeedIds(),
      ]).then(([votedNewsFeedIds, hiddenNewsFeedIds]) => {
        setUserData({ ...userData, votedNewsFeedIds, hiddenNewsFeedIds });
      });
    }
  }, [pageNum]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [curPageNewsFeedData]);

  if (!curPageNewsFeedData) {
    return null;
  }

  if (curPageNewsFeedData.error) {
    return (
      <Box p="4" bg="springWood" display="flex" justifyContent="center">
        <Text fontSize="8">&#128531;</Text>
        <Text fontSize="6" ml="2" mr="2">
          Whoops! Something went wrong on this page.
        </Text>
        <Text fontSize="8">&#128531;</Text>
      </Box>
    );
  }

  return (
    <Box pt="3" bg="springWood">
      {curPageNewsFeedData.hits
        .filter(newsFeedHit => {
          const { id } = newsFeedHit;
          return userHiddenNewsFeedIds.indexOf(id) === -1;
        })
        .map((newsFeedHit, index) => {
          const { id } = newsFeedHit;

          return (
            <NewsFeed
              voted={userVotedNewsFeedIds.indexOf(id) !== -1}
              onUpVoteButtonClick={onUpVoteButtonClick}
              onHideButtonClick={onHideButtonClick}
              highlighted={index % 2 !== 0}
              key={id}
              data={newsFeedHit}
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
  userData: PropTypes.shape({
    votedNewsFeedIds: PropTypes.arrayOf(PropTypes.object),
    hiddenNewsFeedIds: PropTypes.arrayOf(PropTypes.object),
  }),
};

News.defaultProps = {
  pageNum: '0',
  newsFeedData: { hits: [] },
  userData: {},
};

export default News;
