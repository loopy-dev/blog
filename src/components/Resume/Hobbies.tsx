import ArticleLayout from '~/components/layouts/ArticleLayout';
import hobbies from '~/data/hobbies';

const Hobbies = () => {
  return (
    <ArticleLayout title="취미">
      {hobbies.map((hobby) => (
        <Hobby key={hobby.title} content={hobby} />
      ))}
    </ArticleLayout>
  );
};

export default Hobbies;

import type { Resume } from '~/models/Resume';

interface HobbyProps {
  content: Resume;
}

const Hobby = ({ content }: HobbyProps) => {
  return (
    <div>
      <h2 className="font-bold text-xl">{content.title}</h2>
      {content.introduction && (
        <h3 className="font-bold my-4">{content.introduction}</h3>
      )}
      {content.description && (
        <ul className="my-4 list-disc pl-4">
          {content.description.map((description) =>
            typeof description === 'string' ? (
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
      )}
    </div>
  );
};
