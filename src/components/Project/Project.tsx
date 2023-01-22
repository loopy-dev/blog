// TODO - prop으로 데이터 전달받아서 컴포넌트 재사용
import classes from "./Project.module.css";

const Project = () => {
  return (
    <div className="flex relative md:flex-row flex-col gap-2 w-full">
      <div className="md:sticky self-start top-1 md:w-60 shrink-0">
        <h2 className="font-bold text-3xl py-1 break-all">Title</h2>
        <p className="pt-4 text-zinc-400">2022-10 ~ </p>
        <div className="flex gap-2 pt-4 mb-4">
          <div className="bg-zinc-300 w-8 h-8" />
          <div className="bg-zinc-300 w-8 h-8" />
          <div className="bg-zinc-300 w-8 h-8" />
        </div>
      </div>
      <div className="w-full">
        {/** Project Image */}
        <h3 className="font-bold text-xl mb-4">
          퀴즈를 통한 지식 체크 서비스를 제공합니다.퀴즈를 통한 지식 체크
          서비스를 제공합니다.퀴즈를 통한 지식 체크 서비스를 제공합니다.
        </h3>
        <ul className="my-4">
          <li>세부 사항 1</li>
          <li>세부 사항 2</li>
          <li>세부 사항 3</li>
          <li>세부 사항 4</li>
        </ul>
        {/** 기술 스택 */}
        <div className="flex items-center gap-8">
          <h3 className="font-bold text-xl my-4">사용 기술</h3>
          <span className=" text-gray-300">
            버튼 클릭시 설명을 볼 수 있습니다.
          </span>
        </div>
        <div
          className={`flex gap-2 my-4 overflow-x-auto ${classes["scroll-hide"]}`}
        >
          <div className="border py-1 px-4 rounded-full cursor-pointer hover:bg-rose-400 hover:text-white select-none transition-all whitespace-nowrap">
            React
          </div>
          <div className="border py-1 px-4 rounded-full cursor-pointer hover:bg-rose-400 hover:text-white select-none transition-all whitespace-nowrap">
            Tailwind css
          </div>
          <div className="border py-1 px-4 rounded-full cursor-pointer hover:bg-rose-400 hover:text-white select-none transition-all whitespace-nowrap">
            Next
          </div>
          <div className="border py-1 px-4 rounded-full cursor-pointer hover:bg-rose-400 hover:text-white select-none transition-all whitespace-nowrap">
            Styled Components
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg my-2">React</h4>
          <p>사용 기술에 대한 설명입니다.</p>
        </div>
        <h3 className="font-bold text-xl my-4">링크</h3>
        Project Component
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
        <p>long text</p>
      </div>
    </div>
  );
};

export default Project;
