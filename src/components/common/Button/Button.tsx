import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'transparent';
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
}

const variantStyle = css<Props>`
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: ${cssVar('primary')};
          color: rgb(255, 255, 255);
        `;
      case 'transparent':
        return css`
          background-color: transparent;
        `;
      default:
        return css`
          background-color: ${cssVar('bg_page1')};
          color: ${cssVar('text1')};
        `;
    }
  }}
`;

const borderStyle = css<Props>`
  ${({ borderStyle }) => {
    switch (borderStyle) {
      case 'solid':
        return css`
          border: 1px solid rgba(0, 0, 0, 0.18);
        `;
      case 'dashed':
        return css`
          border: 1px dashed rgba(0, 0, 0, 0.18);
        `;
      case 'dotted':
        return css`
          border: 1px dotted rgba(0, 0, 0, 0.18);
        `;
      case 'double':
        return css`
          border: 1px double rgba(0, 0, 0, 0.18);
        `;
      default:
        return css`
          border: none;
        `;
    }
  }}
`;

const Button = styled.button<Props>`
  font-weight: 500;
  line-height: 1.5;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 16px;
  height: ${({ size }) => {
    switch (size) {
      case 'lg':
        return '56px';
      default:
        return '44px';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'lg':
        return '18px';
      default:
        return '16px';
    }
  }};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  border-radius: 6px;
  cursor: pointer;

  ${variantStyle}
  ${borderStyle}

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0px 10000px inset;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.06);
    color: rgba(0, 0, 0, 0.25);
    box-shadow: none;
    cursor: default;
  }
`;

export default Button;
