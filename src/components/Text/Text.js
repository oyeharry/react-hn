import styled from 'styled-components';
import { space, layout, color, typography } from 'styled-system';

function noTextOverflowStyle(props) {
  const { noTextOverflow } = props;

  if (noTextOverflow) {
    return `
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
   `;
  }
  return '';
}

const Text = styled.div`
  padding: 0;
  margin: 0;
  ${space}
  ${layout}
  ${color}
  ${typography}
  ${noTextOverflowStyle}
`;

Text.defaultProps = {
  fontFamily: 'primary',
  color: 'text.primary',
  as: 'p',
};

Text.propTypes = {};
export default Text;
