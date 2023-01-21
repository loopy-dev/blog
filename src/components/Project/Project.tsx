// TODO - prop으로 데이터 전달받아서 컴포넌트 재사용
import classes from "./Project.module.css";

const Project = () => {
  return (
    <div className="flex relative gap-2">
      <div className="sticky self-start top-1 w-60">
        <h2 className="font-bold text-3xl py-1">Title</h2>
        <p className="pt-4 text-zinc-400">2022-10 ~ </p>
        <div className="flex gap-2 pt-4">
          <div className="bg-zinc-300 w-8 h-8" />
          <div className="bg-zinc-300 w-8 h-8" />
          <div className="bg-zinc-300 w-8 h-8" />
        </div>
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl mb-4">
          퀴즈를 통한 지식 체크 서비스를 제공합니다.
        </h3>
        <ul className="my-4">
          <li>세부 사항 1</li>
          <li>세부 사항 2</li>
          <li>세부 사항 3</li>
          <li>세부 사항 4</li>
        </ul>
        {/** 기술 스택 */}
        <h3 className="font-bold text-xl my-4">사용 기술</h3>
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
