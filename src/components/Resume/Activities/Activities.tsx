import { activities } from '../../../data/activities';
import ContentTemplate from '../ContentTemplate';

const Activities = () => {
  return (
    <article className="mx-auto max-w-4xl p-8">
      <header>
        <h1 className="font-bold text-3xl my-8 break-all">Activities</h1>
      </header>
      <section className="flex flex-col gap-40">
        {activities.map((activity) => (
          <ContentTemplate key={activity.title} content={activity} />
        ))}
      </section>
    </article>
  );
};

export default Activities;
