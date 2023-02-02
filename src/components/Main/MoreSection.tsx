import Icon from '../icons';
import LinkButton from './LinkButton';

/**
 * @description
 * This is know more about me component.
 */
const MoreSection = () => {
  return (
    <section>
      <LinkButton href="https://github.com/mrbartrns" target="_blank">
        <span className="inline-flex gap-2 justify-center items-center">
          <Icon type="github" />
          Github에서 더 알아보기
        </span>
      </LinkButton>
    </section>
  );
};

export default MoreSection;
