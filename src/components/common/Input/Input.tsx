import type { InputHTMLAttributes } from 'react';
import React from 'react';
import styled from 'styled-components';
import Label from './Label';
import { borderStyle } from './styles';
import type { Color } from './styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: Color;
}

const Input = (
  { label, variant = 'default', ...props }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  return (
    <Container>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <InputFrame disabled={props.disabled} variant={variant}>
        <InputBase ref={ref} variant={variant} {...props} />
      </InputFrame>
    </Container>
  );
};

export default React.forwardRef(Input);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const InputFrame = styled.div<Props>`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 16px;
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(0, 0, 0, 0.1)' : 'rgb(255, 255, 255)'};
  border-radius: 6px;
  cursor: text;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;

  ${borderStyle}
`;

const InputBase = styled.input<Props>`
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: 14px;
  line-height: 1.5;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
`;
