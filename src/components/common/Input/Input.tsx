import type { InputHTMLAttributes } from 'react';
import React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import Label from './Label';
import { borderStyle, shapeStyle, frameSizeStyle } from './styles';
import type { Color } from './styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: Color;
  shape?: 'normal' | 'rounded';
  $frameSize?: 'md' | 'lg';
  left?: React.ReactNode;
}

const Input = (
  {
    label,
    variant = 'default',
    shape = 'normal',
    $frameSize = 'md',
    left,
    ...props
  }: Props,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  return (
    <Container>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <InputFrame
        $frameSize={$frameSize}
        disabled={props.disabled}
        shape={shape}
        variant={variant}
        className={classNames('dark:bg-zinc-800', {
          'bg-zinc-900/[0.12]': props.disabled,
        })}
      >
        {left && <Left>{left}</Left>}
        <InputBase
          ref={ref}
          $frameSize={$frameSize}
          variant={variant}
          {...props}
        />
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
  padding: 0 16px;
  border-radius: 6px;
  cursor: text;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;

  ${borderStyle}
  ${shapeStyle}
  ${frameSizeStyle}
`;

const InputBase = styled.input<Props>`
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  font-size: ${({ $frameSize }) => ($frameSize === 'lg' ? '16px' : '14px')};
  line-height: 1.5;
  text-overflow: ellipsis;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
`;

const Left = styled.span`
  flex-shrink: 0;
`;
