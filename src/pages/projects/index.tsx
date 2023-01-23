import Project from "../../components/Project";
import ProjectPageLayout from "../../components/ProjectPageLayout";
import chulcheck from "../../data/projects";

const Projects = () => {
  return (
    <ProjectPageLayout>
      <article className="mx-auto max-w-4xl">
        <header className="p-8">
          <h1 className="font-bold text-5xl py-1 break-all">Projects</h1>
        </header>
        <section className="p-8">
          <Project project={chulcheck} />
        </section>
      </article>
    </ProjectPageLayout>
  );
};

export default Projects;
