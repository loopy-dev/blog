type Position = 'top' | 'right' | 'bottom' | 'left';

interface Props {
  hover?: boolean;
  content: string;
  position?: Position;
  className?: string;
}

const DEFAULT_CLASSNAMES =
  'absolute transition-all bg-gray-900 text-gray-50 rounded-md text-xs py-1 px-2 select-none z-10 min-w-max';

// FIXME - tooltip width can be over navbar width but it isn't.
const Tooltip = ({ className, content, position = 'bottom' }: Props) => {
  return (
    <div className={`${className} ${POSITION[position]} ${DEFAULT_CLASSNAMES}`}>
      {content}
    </div>
  );
};

type PositionProps = {
  [key in Position]: string;
};

/** TODO - fill top and right position */
const POSITION: PositionProps = {
  bottom: 'mt-2 left-1/2 -translate-x-1/2',
  top: '',
  left: '',
  right: 'top-1/2 -translate-y-1/2 left-full ml-2',
};

export default Tooltip;
