import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Anchor from '../Anchor';

function NavAnchor(props) {
  const { to, exact, activePaths, children, ...rest } = props;
  const { pathname } = useLocation();
  let anchorTextColor;

  if (exact && pathname === to) {
    anchorTextColor = 'white';
  } else if (pathname.indexOf(to) !== -1) {
    anchorTextColor = 'white';
  } else if (activePaths.length) {
    const activeMatched = activePaths.some(
      ({ path: activePath, exact: exactPath }) => {
        if (exactPath) {
          return activePath === pathname;
        }
        return pathname.indexOf(activePath) !== -1;
      }
    );
    if (activeMatched) {
      anchorTextColor = 'white';
    }
  }

  return (
    <Anchor to={to} color={anchorTextColor} {...rest}>
      {children}
    </Anchor>
  );
}

NavAnchor.defaultProps = {
  to: '',
  exact: false,
  activePaths: [],
};

NavAnchor.propTypes = {
  to: PropTypes.string,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired,
  activePaths: PropTypes.array,
};

export default NavAnchor;
