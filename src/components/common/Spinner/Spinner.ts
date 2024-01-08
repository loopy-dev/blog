import styled from 'styled-components';

const Spinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-style: solid;
  border-width: 2px;
  border-top-color: transparent;
  border-right-color: inherit;
  border-bottom-color: inherit;
  border-left-color: inherit;
  border-radius: 50%;
  animation: 1s linear 0s infinite normal none running rotation;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
