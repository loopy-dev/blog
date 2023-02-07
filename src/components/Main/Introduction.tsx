import Icon from '../icons';
import LinkButton from './LinkButton';

const Introduction = () => {
  return (
    <article className="mx-auto max-w-4xl p-8">
      {/** Header */}
      <div className="mt-24 mb-12 font-bold sm:text-4xl text-2xl sm:leading-normal md:leading-normal leading-normal text-gray-800">
        <h1>환영합니다!</h1>
        <h1>프론트엔드 개발자 고준혁입니다.</h1>
      </div>
      {/** introduction */}
      <ul className="text-xl my-12">
        <li className="py-1">
          호기심이 많으며 이에 오픈 소스코드를 분석했었던 경험이 있습니다.
        </li>
        <li className="py-1">작성한 코드를 항상 자식처럼 생각합니다.</li>
        <li className="py-1">
          글 쓰는 것을 좋아하며 블로그를 통해 생각을 공유하고 있습니다.
        </li>
      </ul>
      <div>
        <LinkButton href="https://github.com/mrbartrns" target="_blank">
          <span className="inline-flex gap-2 justify-center items-center">
            <Icon type="github" />
            Github에서 더 알아보기
          </span>
        </LinkButton>
      </div>
    </article>
  );
};

export default Introduction;
