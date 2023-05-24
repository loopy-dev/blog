import classNames from 'classnames';
import ContentLayout from '~/components/layouts/ContentLayout';
import Icon from '../../icons';
import styles from './Introduction.module.scss';

const Introduction = () => {
  return (
    <ContentLayout>
      {/** Header */}
      <div
        className={classNames(
          'mt-24',
          'mb-12',
          'font-bold',
          'sm:text-4xl',
          'text-2xl',
          'tracking-tight'
        )}
      >
        <h1>환영합니다!</h1>
        <h1>프론트엔드 개발자 벤입니다.</h1>
      </div>
      {/** introduction */}
      <ul className={classNames('md:text-xl', 'my-12')}>
        <li className={classNames('py-1', 'tracking-tighter')}>
          {"항상 '왜?'에 대한 고민을 하면서 개발합니다."}
        </li>
        <li className={classNames('py-1', 'tracking-tighter')}>
          작성한 코드와 프로젝트에 대해 자식처럼 생각하며 오너십을 갖고 개발하고
          있습니다.
        </li>
        <li className={classNames('py-1', 'tracking-tighter')}>
          글 쓰는 것을 좋아하며 블로그를 통해 생각을 공유하고 있습니다.
        </li>
      </ul>
      <div
        className={classNames(
          'flex',
          'gap-4',
          'sm:gap-8',
          'justify-between',
          'sm:justify-start'
        )}
      >
        <a
          href="https://github.com/mrbartrns"
          rel="noreferrer"
          target="_blank"
          className={classNames(
            styles['link-button'],
            'bg-zinc-900',
            'text-white'
          )}
        >
          <span
            className={classNames(
              'inline-flex',
              'gap-2',
              'justify-center',
              'items-center'
            )}
          >
            <span className={classNames('hidden', 'sm:block')}>
              <Icon noHoverEffect type="github" />
            </span>
            Github 가기
          </span>
        </a>
        <a
          href="https://velog.io/@mrbartrns"
          rel="noreferrer"
          target="_blank"
          className={classNames(
            styles['link-button'],
            'text-white',
            'bg-[color:#20c997]'
          )}
        >
          <span
            className={classNames(
              'inline-flex',
              'gap-2',
              'justify-center',
              'items-center'
            )}
          >
            이전 블로그
          </span>
        </a>
      </div>
    </ContentLayout>
  );
};

export default Introduction;
