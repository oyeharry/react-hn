import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { space, layout, border, typography, color } from 'styled-system';

function Anchor(props) {
  const { to, children, maxWidth, noTextOverflow, ...rest } = props;
  const Component = to ? Link : 'a';
  return (
    <Component to={to} {...rest}>
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
  fontFamily: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  href: PropTypes.string,
};

export default StyledAnchor;
