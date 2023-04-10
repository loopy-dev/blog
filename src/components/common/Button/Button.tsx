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
  size?: 'md' | 'lg' | 'xs';
  shape?: 'normal' | 'rounded';
  fullWidth?: boolean;
}

const shapeStyle = css<Props>`
  border-radius: ${({ shape }) => (shape === 'rounded' ? '9999px' : '6px')};
`;

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

const sizeStyle = css<Props>`
  ${({ size }) => {
    switch (size) {
      case 'lg':
        return css`
          padding: 0 16px;
          height: 56px;
          font-size: 18px;
          line-height: 1.5;
        `;
      case 'md':
        return css`
          padding: 0 16px;
          height: 44px;
          font-size: 16px;
          line-height: 1.5;
        `;
      case 'xs':
        return css`
          padding: 6px 10px;
          font-size: 12px;
          line-height: 1;
        `;
      default:
        return css`
          padding: 0 16px;
          height: 44px;
          font-size: 16px;
          line-height: 1.5;
        `;
    }
  }}
`;

const Button = styled.button<Props>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  cursor: pointer;

  ${sizeStyle}
  ${variantStyle}
  ${borderStyle}
  ${shapeStyle}

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
