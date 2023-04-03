import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

interface Props extends HTMLAttributes<HTMLElement> {
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Hamburger = ({ onClick, ...props }: Props) => {
  const [isActive, setActive] = useState(false);

  const toggle = () => {
    setActive((prev) => !prev);
  };

  return (
    <Container
      isActive={isActive}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
      {...props}
    >
      <span />
      <span />
      <span />
    </Container>
  );
};

export default Hamburger;

interface Props {
  isActive?: boolean;
}

const Container = styled.span<Props>`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 16px;
  cursor: pointer;

  span {
    display: inline-block;
    position: absolute;
    right: 0;
    width: 100%;
    height: 2.2px;
    border-radius: 4px;
    transition: all 0.2s;
    background-color: ${cssVar('text4')};

    &:hover {
      background-color: ${cssVar('text3')};
    }

    &:nth-of-type(1) {
      top: 0;
    }

    &:nth-of-type(2) {
      top: 43%;
    }

    &:nth-of-type(3) {
      bottom: 0;
    }

    ${({ theme }) => css`
      background-color: ${theme.text};
    `}

    ${({ isActive }) =>
      isActive &&
      css`
        &:nth-of-type(1) {
          transform: translateY(6.55px) rotate(-45deg);
        }
        &:nth-of-type(2) {
          opacity: 0;
        }
        &:nth-of-type(3) {
          transform: translateY(-6.55px) rotate(45deg);
        }
      `}
  }
`;
