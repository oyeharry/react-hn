import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Box from '../components/Box';
import Text from '../components/Text';
import Anchor from '../components/Anchor';
import NewsFeed from '../components/NewsFeed';
import ProgressBar from '../components/ProgressBar';
import NewsFeedService from '../components/NewsFeedService';
import UserService from '../components/UserService';
import useNewsFeedData from '../components/useNewsFeedData';
import useUserData from '../components/useUserData';

export async function getServerSideProps(req) {
  const { params } = req;
  const { pageNum = 0, storyType = 'topstories' } = params;
  const newsFeedPageData = await NewsFeedService.queryNewsFeed({
    pageNum,
    storyType,
  });

  const userData = await UserService.getUserData();

  return {
    props: {
      newsFeedData: { [`${storyType}_${pageNum}`]: newsFeedPageData },
      userData,
    },
  };
}

function News(props) {
  const { newsFeedData, userData: appUserData } = props;
  const { pageNum = 0, storyType = 'topstories' } = useParams();

  const { userData, voteNewsFeedOfId, hideNewsFeedOfId } = useUserData(
    appUserData
  );
  const {
    newsFeedDataLoading,
    curPageNewsFeedData,
    newsFeedDataByPage,
  } = useNewsFeedData({
    pageNum,
    storyType,
    initialNewsFeedData: newsFeedData,
  });

  const {
    votedNewsFeedIds: userVotedNewsFeedIds = [],
    hiddenNewsFeedIds: userHiddenNewsFeedIds = [],
  } = userData;

  useEffect(() => {
    if (newsFeedDataByPage[`${storyType}_${pageNum}`]) {
      window.scrollTo(0, 0);
    }
  }, [newsFeedDataByPage, pageNum, storyType]);

  if (!curPageNewsFeedData) {
    return null;
  }

  const {
    error: curPageNewsFeedError,
    hits: curPageNewsFeedHits,
  } = curPageNewsFeedData;

  if (curPageNewsFeedError) {
    return (
      <Box p="4" bg="springWood" display="flex">
        <Text fontSize="8">&#128531;</Text>
        <Text fontSize="6" ml="2" mr="2">
          Whoops! Something went wrong on this page.
        </Text>
        <Text fontSize="8">&#128531;</Text>
      </Box>
    );
  }

  return (
    <Box>
      <ProgressBar visible={newsFeedDataLoading} />
      <Box pt="3" bg="springWood">
        {curPageNewsFeedHits
          .filter(newsFeedHit => {
            const { id } = newsFeedHit;
            return userHiddenNewsFeedIds.indexOf(id) === -1;
          })
          .map((newsFeedHit, index) => {
            const { id } = newsFeedHit;

            return (
              <NewsFeed
                voted={userVotedNewsFeedIds.indexOf(id) !== -1}
                onUpVoteButtonClick={voteNewsFeedOfId}
                onHideButtonClick={hideNewsFeedOfId}
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
              to={`/news/${storyType}/${parseInt(pageNum, 10) + 1}`}
            >
              More
            </Anchor>
          )}
        </Box>
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
