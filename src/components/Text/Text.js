import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, layout, color, typography } from 'styled-system';

const Text = styled.div`
  ${space}
  ${layout}
  ${color}
  ${typography}
`;

Text.defaultProps = {
  fontFamily: 'primary',
  color: 'text.primary',
};

Text.propTypes = {};
export default Text;
