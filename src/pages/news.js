import React from 'react';

import Box from '../components/Box';
import Button from '../components/Button';
import NewsFeed from '../components/NewsFeed';

function News(props) {
  const { data } = props;
  return (
    <Box pt="3" bg="springWood">
      <NewsFeed></NewsFeed>
      <NewsFeed highlighted></NewsFeed>
      <NewsFeed></NewsFeed>
      <NewsFeed highlighted></NewsFeed>
      <NewsFeed></NewsFeed>
      <NewsFeed highlighted></NewsFeed>
      <NewsFeed></NewsFeed>
      <NewsFeed highlighted></NewsFeed>
      <Box>
        <Button color="primary.main" ml="5">
          More
        </Button>
      </Box>
    </Box>
  );
}

News.getServerSideProps = () => {
  return Promise.resolve({
    props: {
      awesome: 'whoa',
    },
  });
};

export default News;
