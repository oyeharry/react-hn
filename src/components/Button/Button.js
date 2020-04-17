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
  fontSize: '15px',
};

Button.propTypes = {};

export default Button;
