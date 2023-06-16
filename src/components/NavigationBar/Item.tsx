import styled, { css } from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

interface ItemProps {
  noHoverEffect?: boolean;
  current?: boolean;
}

export const Item = styled.div<ItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;
  cursor: pointer;
  width: 100%;
  padding: 4px 8px;
  font-weight: 500;

  ${({ current }) =>
    current
      ? css`
          color: ${cssVar('text1')};
        `
      : css`
          color: ${cssVar('text2')};
        `}

  ${({ noHoverEffect }) =>
    !noHoverEffect &&
    css`
      &:hover {
        color: ${cssVar('primary_light')};
      }
    `}
`;
