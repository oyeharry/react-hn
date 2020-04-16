import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { space, layout, border, typography, color } from 'styled-system';

function Anchor(props) {
  const { href, children, ...rest } = props;
  const Component = href ? 'a' : Link;
  return (
    <Component href={href} {...rest}>
      {children}
    </Component>
  );
}

const StyledAnchor = styled(Anchor)`
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  padding: 8px 16px;
  ${space}
  ${layout}
  ${border}
  ${typography}
  ${color}
`;

StyledAnchor.defaultProps = {
  fontFamily: 'primary',
  fontSize: '15px',
  color: 'text.primary',
  href: null,
};

StyledAnchor.propTypes = {
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  href: PropTypes.string,
};

export default StyledAnchor;
