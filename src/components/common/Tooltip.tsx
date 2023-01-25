interface Props {
  hover?: boolean;
  content: string;
}

type Config = {
  [key: string | number]: string;
};

const DEFAULT_CLASSNAMES =
  'absolute transition-all -translate-x-1/2 bg-gray-900 text-gray-50 rounded-md mt-2 left-1/2 text-xs py-1 px-2';

const CONFIG: Config = {
  enter: `opacity-100 ${DEFAULT_CLASSNAMES}`,
  leave: `opacity-0 ${DEFAULT_CLASSNAMES}`,
};

const Tooltip = ({ hover, content }: Props) => {
  return <div className={CONFIG[hover ? 'enter' : 'leave']}>{content}</div>;
};

export default Tooltip;
