import { css } from 'styled-components';

export type Color = 'default' | 'primary' | 'error' | 'none';

interface Props {
  variant?: Color;
  shape?: 'normal' | 'rounded';
  frameSize?: 'md' | 'lg';
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

export const shapeStyle = css<Props>`
  border-radius: ${({ shape }) => (shape === 'rounded' ? '9999px' : '6px')};
`;

export const frameSizeStyle = css<Props>`
  ${({ frameSize }) => {
    switch (frameSize) {
      case 'md':
        return css`
          height: 32px;
        `;

      case 'lg':
        return css`
          height: 40px;
        `;

      default:
        return css`
          height: 32px;
        `;
    }
  }}
`;
