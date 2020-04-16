import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, layout, border, typography, color } from 'styled-system';

const Button = styled.button`
  border: none;
  border-radius: 0;
  background: none;
  cursor: pointer;
  padding: 8px 16px;
  ${space}
  ${layout}
  ${border}
  ${typography}
  ${color}
`;

Button.defaultProps = {
  fontFamily: 'primary',
};

Button.propTypes = {};

export default Button;
