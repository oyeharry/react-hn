import React from 'react';
import Box from '../Box';
import Text from '../Text';
import Image from '../Image';

function Header(props) {
  return (
    <header>
      <Box display="flex" bg="primary.main" alignItems="center">
        <Box padding="2">
          <Image
            borderWidth="1px"
            borderStyle="solid"
            borderColor="white"
            src="/assets/images/y18.gif"
          ></Image>
        </Box>
        <Box padding="2">
          <Text color="white">top</Text>
        </Box>
        <Box padding="2">
          <Text>|</Text>
        </Box>
        <Box padding="2">
          <Text>new</Text>
        </Box>
      </Box>
    </header>
  );
}

export default Header;
