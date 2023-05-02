import classNames from 'classnames';
import css from './ExperienceLayout.module.css';

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
    <div
      className={classNames(
        'flex',
        'relative',
        'md:flex-row',
        'flex-col',
        'gap-4',
        'w-full'
      )}
    >
      <aside
        className={classNames(
          css.left,
          { 'md:sticky': sticky },
          'self-start',
          'top-16'
        )}
      >
        {left}
      </aside>
      <article className={classNames(css.right)}>{right}</article>
    </div>
  );
};

export default ExperienceLayout;
