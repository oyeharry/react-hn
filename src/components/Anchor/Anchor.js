import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { space, layout, border, typography, color } from 'styled-system';

function Anchor(props) {
  const { to, children, ...rest } = props;
  delete rest.maxWidth;
  delete rest.noTextOverflow;

  const Component = to ? Link : 'a';
  return (
    <Component to={to} {...rest}>
      {children}
    </Component>
  );
}

Anchor.defaultProps = {
  fontFamily: 'primary',
  fontSize: '15px',
  color: 'text.primary',
  href: null,
  to: '',
  // children: null,
  maxWidth: null,
  noTextOverflow: false,
};

Anchor.propTypes = {
  fontFamily: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  href: PropTypes.string,
  to: PropTypes.string,
  // children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.array]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  noTextOverflow: PropTypes.bool,
};

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

StyledAnchor.defaultProps = Anchor.defaultProps;
StyledAnchor.propTypes = Anchor.propTypes;

export default StyledAnchor;
