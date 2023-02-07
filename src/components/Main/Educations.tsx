import { educations } from '../../data/educations';
import Education from './Education';

const Educations = () => {
  return (
    <article className="mx-auto max-w-4xl p-8">
      <header>
        <h1 className="font-bold text-3xl my-8 break-all">Educations</h1>
      </header>
      <section className="flex flex-col gap-40">
        {educations.map((education) => (
          <Education key={education.title} education={education} />
        ))}
      </section>
    </article>
  );
};

export default Educations;
