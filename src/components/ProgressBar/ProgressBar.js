import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color, spacing } from 'styled-system';

const ProgressBarWrapper = styled.div`
  position: relative;
  height: 4px;
  display: block;
  width: 100%;
  border-radius: 2px;
  background-clip: padding-box;
  overflow: hidden;
  transition: opacity 0.6s ease-out 0.4s;
  ${spacing}
  ${color}
`;

const ProgressBarIndeterminate = styled.div`
  &::before {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate 2.1s
      cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
      infinite;
  }
  &::after {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    -webkit-animation: indeterminate-short 2.1s
      cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
      infinite;
    -webkit-animation-delay: 1.15s;
    animation-delay: 1.15s;
  }
  ${spacing}
  ${color}

  @-webkit-keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }
  @keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }
  @-webkit-keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
  @keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
`;

function ProgressBar({ visible }) {
  return (
    <ProgressBarWrapper bg="primary.light" opacity={visible ? 1 : 0}>
      <ProgressBarIndeterminate bg="primary.main"></ProgressBarIndeterminate>
    </ProgressBarWrapper>
  );
}

ProgressBar.defaultProps = { visible: false };

ProgressBar.propTypes = { visible: PropTypes.bool };

export default ProgressBar;
