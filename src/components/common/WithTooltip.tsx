import type { HTMLAttributes } from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';

interface Props extends HTMLAttributes<HTMLDivElement> {
  tooltip: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

const WithTooltip = ({
  tooltip,
  children,
  position = 'bottom',
  ...props
}: Props) => {
  return (
    <Block className="relative">
      <span {...props}>{children}</span>
      {tooltip ? (
        <Tooltip
          className="tooltip hidden md:block"
          content={tooltip}
          position={position}
        />
      ) : null}
    </Block>
  );
};

export default WithTooltip;

const Block = styled.div`
  & .tooltip {
    display: none;
  }

  @media (min-width: 768px) {
    &:hover {
      & .tooltip {
        display: block;
      }
    }
  }
`;
