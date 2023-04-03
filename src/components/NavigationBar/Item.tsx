import styled, { css } from 'styled-components';

interface ItemProps {
  noHoverEffect?: boolean;
  current?: boolean;
}

export const Item = styled.div<ItemProps>`
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;
  cursor: pointer;
  width: 100%;
  padding: 4px 8px;
  font-size: 14px;

  ${({ current, theme }) =>
    current
      ? css`
          color: ${theme.text};
        `
      : css`
          color: rgb(161, 161, 170);
        `}

  ${({ noHoverEffect, theme }) =>
    !noHoverEffect &&
    css`
      &:hover {
        color: ${theme.text};
      }
    `}
`;
