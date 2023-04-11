import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

export const Item = styled.div`
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;
  cursor: pointer;
  width: 100%;
  padding: 4px 8px;
  font-weight: 500;
  &:hover {
    color: ${cssVar('primary_light')};
  }
`;
