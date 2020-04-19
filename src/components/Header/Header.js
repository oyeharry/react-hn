import React from 'react';

import Box from '../Box';
import Text from '../Text';
import Image from '../Image';
import Anchor from '../Anchor';

function Header() {
  return (
    <header>
      <Box display="flex" bg="primary.main" alignItems="center">
        <Box>
          <Anchor to="/" padding="2">
            <Image
              borderWidth="1px"
              borderStyle="solid"
              borderColor="white"
              alt="Hacker News Logo"
              src="/assets/images/y18.gif"
            ></Image>
          </Anchor>
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
