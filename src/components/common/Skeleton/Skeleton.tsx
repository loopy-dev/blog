import classNames from 'classnames';
import styled, { css } from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

interface Props {
  // color?: 'default'
  circle?: boolean;
  $noSpacing?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
  flex?: number;
  borderRadius?: string;
}

/**
 * @description
 * skeleton component for loading state.
 * control width and height by className(tailwind css).
 */
const Skeleton = ({
  width,
  height,
  flex,
  borderRadius,
  className,
  ...props
}: Props) => {
  return (
    <Block
      {...props}
      className={classNames('animate-pulse', className)}
      style={{ width, height, flex, borderRadius }}
    />
  );
};

const Block = styled.span<Props>`
  display: inline-block;
  height: 1em;
  border-radius: 4px;
  background-color: ${cssVar('bg_skeleton')};

  ${({ circle }) =>
    circle &&
    css`
      border-radius: 9999px;
    `}

  ${({ $noSpacing }) =>
    !$noSpacing &&
    css`
      & + & {
        margin-left: 8px;
      }
    `}
`;

export default Skeleton;
