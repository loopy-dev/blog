import Head from 'next/head';
import Project from '../../components/Project';
import GlobalLayout from '../../components/layouts/GlobalLayout';
import projects from '../../data/projects';

const Projects = () => {
  return (
    <>
      <Head>
        <title>Projects - Portfolio</title>
        <meta key="title" content="Projects - Portfolio" property="og:title" />
      </Head>
      <GlobalLayout>
        <article className="mx-auto max-w-4xl">
          <header className="p-8">
            <h1 className="font-bold text-5xl py-1 break-all">Projects</h1>
          </header>
          <section className="flex flex-col gap-40 p-8">
            {projects.map((project) => (
              <Project key={project.title} project={project} />
            ))}
          </section>
        </article>
      </GlobalLayout>
    </>
  );
};

export default Projects;
