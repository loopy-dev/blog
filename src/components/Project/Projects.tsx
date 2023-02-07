import projects from '../../data/projects';
import Project from './Project';

const Projects = () => {
  return (
    <article className="mx-auto max-w-4xl p-8">
      <header>
        <h1 className="font-bold text-3xl my-8 break-all">Projects</h1>
      </header>
      <section className="flex flex-col gap-40">
        {projects.map((project) => (
          <Project key={project.title} project={project} />
        ))}
      </section>
    </article>
  );
};

export default Projects;
