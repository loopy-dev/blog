type Position = 'top' | 'right' | 'bottom' | 'left';

interface Props {
  hover?: boolean;
  content: string;
  position?: Position;
}

const DEFAULT_CLASSNAMES =
  'absolute transition-all bg-gray-900 text-gray-50 rounded-md text-xs py-1 px-2 select-none z-10 hidden md:block';

// FIXME - tooltip width can be over navbar width but it isn't.
const Tooltip = ({ hover, content, position = 'bottom' }: Props) => {
  return (
    <div
      className={`${CONFIG[hover ? 'enter' : 'leave']} ${
        POSITION[position]
      } ${DEFAULT_CLASSNAMES}`}
    >
      {content}
    </div>
  );
};

type Config = {
  [key: string | number]: string;
};

type PositionProps = {
  [key in Position]: string;
};

const CONFIG: Config = {
  enter: `opacity-100`,
  leave: `opacity-0`,
};

/** TODO - fill top and right position */
const POSITION: PositionProps = {
  bottom: 'mt-2 left-1/2 -translate-x-1/2',
  top: '',
  left: '',
  right: 'top-1/2 -translate-y-1/2 left-full ml-2',
};

export default Tooltip;
