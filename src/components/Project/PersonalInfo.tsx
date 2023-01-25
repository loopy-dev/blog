import GithubIcon from '../icons/GithubIcon';
import PortfolioIcon from '../icons/PortfolioIcon';
import WebIcon from '../icons/WebIcon';
import type { PersonalLink } from '../../models/Project';

interface Props {
  links?: Partial<PersonalLink>;
}

const PersonalInfo = ({ links }: Props) => {
  return links ? (
    <div className="flex flex-wrap gap-3 my-4">
      {links.github && (
        <a href={links.github.url} rel="noopener noreferrer" target="_blank">
          <GithubIcon />
        </a>
      )}
      {links.website && (
        <a href={links.website.url} rel="noopener noreferrer" target="_blank">
          <WebIcon />
        </a>
      )}
      {links.portfolio && (
        <a href={links.portfolio.url} rel="noopener noreferrer" target="_blank">
          <PortfolioIcon />
        </a>
      )}
    </div>
  ) : null;
};

export default PersonalInfo;
