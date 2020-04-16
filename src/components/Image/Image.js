import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, layout, border } from 'styled-system';

const Image = styled.img`
  ${space}
  ${layout}
  ${border}
`;

Image.defaultProps = {};

Image.propTypes = {};
export default Image;
