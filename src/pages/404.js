import React from 'react';

import Box from '../components/Box';
import Text from '../components/Text';

function Page404() {
  return (
    <Box p="4" bg="springWood" display="flex">
      <Text fontSize="8">&#128554;</Text>
      <Text fontSize="6" ml="2" mr="2">
        Page not found!
      </Text>
      <Text fontSize="8">&#128554;</Text>
    </Box>
  );
}

export default Page404;
