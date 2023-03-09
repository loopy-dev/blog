import styled, { css } from 'styled-components';

interface Props {
  color?: 'black' | 'turquoise';
}

const LinkButton = styled.a<Props>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  color: rgb(249, 250, 251);
  user-select: none;
  font-size: 1.125rem /* 18px */;
  line-height: 1.75rem /* 28px */;
  border-radius: 8px;

  ${({ color }) =>
    color === 'black'
      ? css`
          background-color: rgb(17 24 39);
        `
      : css`
          background-color: #20c997;
        `}

  @media (max-width: 640px) {
    padding: 1rem;
    font-size: 0.8rem;
    line-height: 1.3rem;
    flex: 1;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0px 10000px inset;
  }
`;

export default LinkButton;
