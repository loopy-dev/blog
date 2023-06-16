import classNames from 'classnames';
import { FaGithub, FaBook } from 'react-icons/fa';
import { TfiWorld } from 'react-icons/tfi';
import type { PersonalLink } from '~/models/Resume';

interface Props {
  links: Partial<PersonalLink>;
}

const PersonalInfo = ({ links }: Props) => {
  return (
    <div className={classNames('flex', 'gap-2', 'my-4')}>
      {links.github && (
        <a
          href={links.github.url}
          rel="noopener noreferrer"
          target="_blank"
          className={classNames(
            'inline-flex',
            'justify-center',
            'items-center'
          )}
        >
          <FaGithub
            className={classNames(
              'text-3xl',
              'text-zinc-300',
              'hover:text-zinc-400'
            )}
          />
        </a>
      )}
      {links.website && (
        <a
          href={links.website.url}
          rel="noopener noreferrer"
          target="_blank"
          className={classNames(
            'inline-flex',
            'justify-center',
            'items-center'
          )}
        >
          <TfiWorld
            className={classNames(
              'text-3xl',
              'text-zinc-300',
              'hover:text-zinc-400'
            )}
          />
        </a>
      )}
      {links.portfolio && (
        <a href={links.portfolio.url} rel="noopener noreferrer" target="_blank">
          <FaBook
            className={classNames(
              'text-3xl',
              'text-zinc-300',
              'hover:text-zinc-400'
            )}
          />
        </a>
      )}
    </div>
  );
};

export default PersonalInfo;
