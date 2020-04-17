import React from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';
import Text from '../Text';
import Image from '../Image';
import Button from '../Button';
import Anchor from '../Anchor';

function NewsFeed(props) {
  const {
    highlighted,
    voted,
    data,
    onUpVoteButtonClick,
    onHideButtonClick,
  } = props;

  const {
    totalComments,
    totalUpVotes,
    title,
    linkDomain,
    username,
    postedWhen,
    url,
    id,
  } = data;

  return (
    <Box
      display="flex"
      alignItems="center"
      bg={highlighted ? 'blackSqueeze' : 'transparent'}
      flexDirection={['column', 'row']}
      width="100%"
    >
      <Box display="flex" alignItems="center" width="100%">
        <Box ml="2" mr="2" width={['40px', '80px']}>
          <Text textAlign="right">{totalComments}</Text>
        </Box>
        <Box padding="2">
          <Text color="primary.dark">{totalUpVotes}</Text>
        </Box>
        <Box padding="0">
          {!voted && (
            <Button
              padding="0"
              onClick={() => onUpVoteButtonClick(id)}
              aria-label="Up Vote"
            >
              <Image
                alt="Up Vote"
                size="12px"
                src="/assets/images/grayarrow2x.gif"
              ></Image>
            </Button>
          )}
          {voted && <Box size="12px" />}
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
            <Anchor fontSize={['5', '6']} href={url} p="0">
              <Text
                noTextOverflow
                as="span"
                display="inline-block"
                maxWidth={['200px', '400px', '300px']}
              >
                {title}
              </Text>
            </Anchor>

            <Anchor
              fontSize="4"
              p={['0', '1']}
              mt={['1', '0', '0']}
              color="gray.600"
              href={url}
            >
              <Text as="span">{linkDomain && '('}</Text>
              <Text as="span">{linkDomain}</Text>
              <Text as="span">{linkDomain && ')'}</Text>
            </Anchor>
          </Box>

          <Box display="flex" alignItems="center" mt={['1', '1', '0']}>
            <Text fontSize="4" color="frenchGray" pl={['0', '0', '1']} pr="1">
              by
            </Text>
            <Text fontSize="4">{username}</Text>
          </Box>

          <Box
            mt={['1', '1', '0']}
            pl={['0', '0', '1']}
            display="flex"
            alignItems="center"
          >
            <Text fontSize="4" color="gray.600">
              {postedWhen}
            </Text>
            <Box pl="1" pr="1" display="flex">
              <Button
                padding="0"
                aria-label="Hide News Feed"
                onClick={() => onHideButtonClick(id)}
              >
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
  data: {
    totalComments: 0,
    totalUpVotes: 0,
    title: '',
    linkDomain: '',
    username: '',
    postedWhen: '',
    url: '',
    id: '0',
  },
  voted: false,
  highlighted: false,
  onUpVoteButtonClick: () => {},
  onHideButtonClick: () => {},
};

NewsFeed.propTypes = {
  data: PropTypes.shape({
    totalComments: PropTypes.number,
    totalUpVotes: PropTypes.number,
    title: PropTypes.string,
    linkDomain: PropTypes.string,
    username: PropTypes.string,
    postedWhen: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.string,
  }),
  voted: PropTypes.bool,
  highlighted: PropTypes.bool,
  onUpVoteButtonClick: PropTypes.func,
  onHideButtonClick: PropTypes.func,
};

export default NewsFeed;
