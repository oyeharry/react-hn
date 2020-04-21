import React from 'react';

import Box from '../Box';
import Text from '../Text';
import Image from '../Image';
import Anchor from '../Anchor';
import NavAnchor from '../NavAnchor';

function Header() {
  return (
    <header>
      <Box display="flex" bg="primary.main" alignItems="center">
        <Box>
          <Anchor to="/" padding="2" size="20px">
            <Image
              borderWidth="1px"
              borderStyle="solid"
              borderColor="white"
              alt="Hacker News Logo"
              src="/assets/images/y18.gif"
            ></Image>
          </Anchor>
        </Box>
        <Box>
          <NavAnchor
            to="/news/topstories"
            activePaths={[{ path: '/', exact: true }]}
            padding="2"
          >
            top
          </NavAnchor>
        </Box>
        <Box padding="2">
          <Text>|</Text>
        </Box>
        <Box>
          <NavAnchor to="/news/newstories" padding="2">
            new
          </NavAnchor>
        </Box>
      </Box>
    </header>
  );
}

export default Header;
