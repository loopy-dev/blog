import { css } from 'styled-components';

export type Color = 'default' | 'primary' | 'error' | 'none';

interface Props {
  variant?: Color;
}

export const borderStyle = css<Props>`
  ${({ variant = 'default' }) => {
    switch (variant) {
      case 'none':
        return css`
          border: none;
        `;
      case 'primary':
        return css`
          border: 1px solid rgb(24, 144, 255);
        `;
      case 'error':
        return css`
          border: 1px solid rgb(255, 77, 79);
        `;
      default:
        return css`
          border: 1px solid rgba(0, 0, 0, 0.18);

          &:hover {
            border: 1px solid rgba(0, 0, 0, 0.45);
          }
        `;
    }
  }}

  &:focus-within {
    border: 1px solid rgb(24, 144, 255);
    box-shadow: rgba(24, 144, 255, 0.3) 0px 0px 0px 2px;
  }
`;
