import ContentLayout from '~/components/layouts/ContentLayout';
import Icon from '../../icons';
import LinkButton from './LinkButton';

const Introduction = () => {
  return (
    <ContentLayout>
      {/** Header */}
      <div
        className="mt-24 mb-12 font-bold sm:text-4xl text-2xl sm:leading-normal md:leading-normal leading-normal"
        style={{ letterSpacing: '-1px' }}
      >
        <h1>환영합니다!</h1>
        <h1>프론트엔드 개발자 벤입니다.</h1>
      </div>
      {/** introduction */}
      <ul className="md:text-xl my-12">
        <li className="py-1" style={{ letterSpacing: '-1px' }}>
          {"항상 '왜?'에 대한 고민을 하면서 개발합니다."}
        </li>
        <li className="py-1" style={{ letterSpacing: '-1px' }}>
          작성한 코드와 프로젝트에 대해 자식처럼 생각하며 오너십을 갖고 개발하고
          있습니다.
        </li>
        <li className="py-1" style={{ letterSpacing: '-1px' }}>
          글 쓰는 것을 좋아하며 블로그를 통해 생각을 공유하고 있습니다.
        </li>
      </ul>
      <div className="flex gap-4 sm:gap-8 justify-between sm:justify-start">
        <LinkButton
          color="black"
          href="https://github.com/mrbartrns"
          target="_blank"
        >
          <span className="inline-flex gap-2 justify-center items-center">
            <span className="hidden sm:block">
              <Icon noHoverEffect type="github" />
            </span>
            Github 가기
          </span>
        </LinkButton>
        <LinkButton
          color="turquoise"
          href="https://velog.io/@mrbartrns"
          target="_blank"
        >
          <span className="inline-flex gap-2 justify-center items-center">
            이전 블로그
          </span>
        </LinkButton>
      </div>
    </ContentLayout>
  );
};

export default Introduction;
