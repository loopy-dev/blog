import { activities } from '../../data/activities';
import Activity from './Activity';

const Activities = () => {
  return (
    <article className="mx-auto max-w-4xl p-8">
      <header>
        <h1 className="font-bold text-3xl my-8 break-all">Educations</h1>
      </header>
      <section className="flex flex-col gap-40">
        {activities.map((activity) => (
          <Activity key={activity.title} activity={activity} />
        ))}
      </section>
    </article>
  );
};

export default Activities;
