import classes from './ExperienceLayout.module.css';

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
  sticky?: boolean;
}

/**
 * @description
 * layout with left: sticky and right: normal.
 * normally used to display projects.
 */
const ExperienceLayout = ({ left, right, sticky }: Props) => {
  return (
    <div className="flex relative md:flex-row flex-col gap-4 w-full">
      <div
        className={`${classes.left} ${
          sticky ? 'md:sticky' : ''
        } self-start top-4`}
      >
        {left}
      </div>
      <div className={`${classes.right}`}>{right}</div>
    </div>
  );
};

export default ExperienceLayout;
