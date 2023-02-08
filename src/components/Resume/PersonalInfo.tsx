import WithTooltip from '../../common/WithTooltip';
import Icon from '../../icons/Icon';
import type { PersonalLink } from '../../../models/Resume';

interface Props {
  links?: Partial<PersonalLink>;
}

const PersonalInfo = ({ links }: Props) => {
  return links ? (
    <div className="flex flex-wrap gap-3 my-4">
      {links.github && (
        <a href={links.github.url} rel="noopener noreferrer" target="_blank">
          <WithTooltip tooltip="github">
            <Icon type="github" />
          </WithTooltip>
        </a>
      )}
      {links.website && (
        <a href={links.website.url} rel="noopener noreferrer" target="_blank">
          <WithTooltip tooltip="website">
            <Icon type="website" />
          </WithTooltip>
        </a>
      )}
      {links.portfolio && (
        <a href={links.portfolio.url} rel="noopener noreferrer" target="_blank">
          <WithTooltip tooltip="portfolio">
            <Icon type="portfolio" />
          </WithTooltip>
        </a>
      )}
    </div>
  ) : null;
};

export default PersonalInfo;
