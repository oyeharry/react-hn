import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, layout, color, flexbox, border } from 'styled-system';

const Box = styled.div`
  ${space}
  ${layout}
  ${color}
  ${flexbox}
  ${border}
`;

Box.defaultProps = {};

Box.propTypes = {};
export default Box;
