import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

const Label = styled.label`
  display: block;
  font-size: 14px;
  line-height: 1.25rem;
  font-weight: bold;
  color: ${cssVar('text2')};
`;

export default Label;
