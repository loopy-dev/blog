import { getTailwindWidth, getTailwindHeight } from "./helper";
interface Props {
  width: number;
  height: number;
}

/**
 * @description
 * This Component is mock component for publishing and temporary layout.
 * Use tailwind css rules.
 * TODO - improve reusability
 */
const Skeleton = ({ width, height }: Props) => {
  return (
    <div
      className={`bg-zinc-300 ${getTailwindWidth(width)} ${getTailwindHeight(
        height
      )} h-8`}
    />
  );
};

export default Skeleton;
