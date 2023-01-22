// TODO - prop으로 데이터 전달받아서 컴포넌트 재사용
import Link from "next/link";
import { Project } from "../../models/Project";
import classes from "./Project.module.css";

interface Props {
  project: Project;
}

const Project = ({ project }: Props) => {
  return (
    <div className="flex relative md:flex-row flex-col gap-2 w-full">
      <div className="md:sticky self-start top-1 md:w-60 shrink-0">
        <h2 className="font-bold text-3xl py-1 break-all">{project.title}</h2>
        {/** TODO - Date format 후 사용하기 */}
        <p className="pt-4 text-zinc-400">
          {project.startDate} ~ {project.endDate || ""}
        </p>
        <div className="flex gap-2 pt-4 mb-4">
          <div className="bg-zinc-300 w-8 h-8" />
          <div className="bg-zinc-300 w-8 h-8" />
          <div className="bg-zinc-300 w-8 h-8" />
        </div>
      </div>
      <div className="w-full">
        {/** Project Image */}
        <h3 className="font-bold text-xl mb-4">{project.introduction}</h3>
        <ul className="my-4 list-disc pl-4">
          {project.description.map((description) =>
            typeof description === "string" ? (
              <li key={description} className="py-1">
                {description}
              </li>
            ) : (
              <li key={description.name} className="py-1">
                {description.name}
              </li>
            )
          )}
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
          {project.skills.map((skill) => (
            <div
              key={skill.name}
              className="border py-1 px-4 rounded-full cursor-pointer hover:bg-rose-400 hover:text-white select-none transition-all whitespace-nowrap"
            >
              {skill.name}
            </div>
          ))}
        </div>
        <div>
          {/** TODO - 현재 선택한 스택을 기준으로 표시하기 */}
          <h4 className="font-bold text-lg my-2">{project.skills[0].name}</h4>
          <p>{project.skills[0].description}</p>
        </div>
        {project.otherLinks ? (
          <h3 className="font-bold text-xl my-4">링크</h3>
        ) : null}
        {project.otherLinks ? (
          <ul className="list-disc pl-4">
            {project.otherLinks.map((link) => (
              <li key={link.url} className="py-1">
                <Link href={link.url}>{link.name}</Link>
              </li>
            ))}
          </ul>
        ) : null}
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
