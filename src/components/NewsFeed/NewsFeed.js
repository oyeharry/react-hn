import React from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';
import Text from '../Text';
import Image from '../Image';
import Button from '../Button';

function NewsFeed(props) {
  const {
    highlighted,
    totalComments,
    totalUpVotes,
    title,
    linkDomain,
    username,
    postedWhen,
  } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      bg={highlighted ? 'blackSqueeze' : 'transparent'}
      flexDirection={['column', 'row']}
    >
      <Box display="flex" alignItems="center">
        <Box mr={['2', '5']} width={['40px', '80px']}>
          <Text textAlign="right">{totalComments}</Text>
        </Box>
        <Box padding="2">
          <Text color="primary.dark">{totalUpVotes}</Text>
        </Box>
        <Box padding="0">
          <Image size="12px" src="/assets/images/grayarrow2x.gif"></Image>
        </Box>
        <Box
          padding="2"
          display="flex"
          flexDirection={['column', 'column', 'row']}
          alignItems={['flex-start', 'flex-start', 'center']}
        >
          <Box
            padding="0"
            display="flex"
            alignItems={['flex-start', 'center']}
            flexDirection={['column', 'row']}
          >
            <Text
              fontSize={['5', '6']}
              as="p"
              maxWidth={['200px', '300px', '300px']}
              noTextOverflow
              alt={title}
              title={title}
            >
              {title}
            </Text>
            <Text fontSize="4" padding={['0', '1']} color="gray.600" as="span">
              ({linkDomain})
            </Text>
          </Box>

          <Box display="flex" alignItems="center" mt={['1', '1', '0']}>
            <Text fontSize="4" color="frenchGray" pl={['0', '0', '1']} pr="1">
              by
            </Text>
            <Text fontSize="4">{username}</Text>
          </Box>

          <Box
            pt={['1', '1', '0']}
            pl={['0', '0', '1']}
            display="flex"
            alignItems="center"
          >
            <Text fontSize="4" color="gray.600">
              {postedWhen}
            </Text>
            <Box padding="1" display="flex">
              <Button padding="0">
                <Text fontSize="4" color="gray.600" as="span">
                  [
                </Text>
                <Text fontSize="4" pr="1" pl="1" as="span">
                  hide
                </Text>
                <Text fontSize="4" color="gray.600" as="span">
                  ]
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

NewsFeed.defaultProps = {
  totalComments: 19,
  totalUpVotes: 82,
  title: 'Seemingly Impossible Swift Programs',
  linkDomain: '(fewbutrip.com)',
  username: 'wool_gather',
  postedWhen: '5 hours ago',
};

NewsFeed.propTypes = {
  totalComments: PropTypes.number,
  totalUpVotes: PropTypes.number,
  title: PropTypes.string,
  linkDomain: PropTypes.string,
  username: PropTypes.string,
  postedWhen: PropTypes.string,
};

export default NewsFeed;
