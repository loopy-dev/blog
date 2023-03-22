import type { TextareaHTMLAttributes } from 'react';
import React from 'react';
import styled from 'styled-components';
import Label from './Label';
import { borderStyle } from './styles';
import type { Color } from './styles';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  variant?: Color;
}

const TextArea = (
  { label, variant = 'default', ...props }: Props,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) => {
  return (
    <Container>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <TextAreaFrame disabled={props.disabled} variant={variant}>
        <TextAreaBase ref={ref} {...props} variant={variant} />
      </TextAreaFrame>
    </Container>
  );
};

export default React.forwardRef(TextArea);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const TextAreaFrame = styled.div<Props>`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  min-width: 0px;
  width: 100%;
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(0, 0, 0, 0.06)' : 'rgb(255, 255, 255)'};
  border-radius: 6px;
  cursor: text;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;

  ${borderStyle}
`;

const TextAreaBase = styled.textarea<Props>`
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  padding: 8px 16px;
  background-color: transparent;
  font-size: 14px;
  line-height: 1.5;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
`;
