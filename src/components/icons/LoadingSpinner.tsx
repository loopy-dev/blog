import classNames from 'classnames';
import styled from 'styled-components';
import { type HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingSpinner = ({ className, ...props }: Props) => {
  return <Container className={classNames('loader', className)} {...props} />;
};

export default LoadingSpinner;

const Container = styled.span`
  &.loader {
    display: inline-block;
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
