import React from 'react';
import Box from '../Box';
import Text from '../Text';
import Image from '../Image';

function NewsFeed(props) {
  const { highlighted } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      bg={highlighted ? 'blackSqueeze' : 'transparent'}
    >
      <Box ml="4" mr="4">
        <Text>36</Text>
      </Box>
      <Box padding="2">
        <Text color="primary.dark">96</Text>
      </Box>
      <Box padding="0">
        <Image size="12px" src="/assets/images/grayarrow2x.gif"></Image>
      </Box>
      <Box padding="2">
        <Text fontSize="6">Seemingly Impossible Swift Programs</Text>
      </Box>
      <Box padding="0">
        <Text fontSize="4" color="gray.600">
          (fewbutrip.com)
        </Text>
      </Box>
      <Box padding="1">
        <Text fontSize="4" color="gray.600">
          by
        </Text>
      </Box>
      <Box padding="1">
        <Text fontSize="4">wool_gather</Text>
      </Box>
      <Box padding="1">
        <Text fontSize="4" color="gray.600">
          5 hours ago
        </Text>
      </Box>
      <Box padding="1" display="flex">
        <Text fontSize="4" color="gray.600">
          [
        </Text>
        <Text fontSize="4" pr="1" pl="1">
          {' '}
          hide{' '}
        </Text>
        <Text fontSize="4" color="gray.600">
          ]
        </Text>
      </Box>
    </Box>
  );
}

export default NewsFeed;
